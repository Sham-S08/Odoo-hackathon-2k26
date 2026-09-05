import prisma from "../../config/prisma.js";
import { audit } from "../../utils/audit.js";

export async function allocateOrder({ orderId, companyId, userId }) {
  return prisma.$transaction(async tx => {
    const order = await tx.salesOrder.findFirst({
      where: { id: orderId, companyId },
      include: { items: true }
    });

    if (!order) {
      const e = new Error("Sales order not found");
      e.code = "ORDER_NOT_FOUND"; e.statusCode = 404; throw e;
    }

    const existing = await tx.inventoryAllocation.count({ where: { salesOrderId: orderId } });
    if (existing) {
      const e = new Error("Order is already allocated");
      e.code = "INVENTORY_ALREADY_ALLOCATED"; e.statusCode = 409; throw e;
    }

    const allocations = [];

    for (const item of order.items) {
      let remaining = item.quantity;

      const stocks = await tx.inventory.findMany({
        where: {
          companyId,
          productId: item.productId,
          quantity: { gt: 0 }
        },
        include: { warehouse: true },
        orderBy: { quantity: "desc" }
      });

      for (const stock of stocks) {
        if (remaining <= 0) break;
        const allocated = Math.min(remaining, stock.quantity);

        allocations.push({
          salesOrderId: orderId,
          warehouseId: stock.warehouseId,
          productId: item.productId,
          quantity: allocated
        });

        await tx.inventory.update({
          where: { id: stock.id },
          data: { quantity: { decrement: allocated } }
        });

        remaining -= allocated;
      }

      if (remaining > 0) {
        allocations.push({
          salesOrderId: orderId,
          warehouseId: null,
          productId: item.productId,
          quantity: remaining,
          isBackorder: true
        });
      }
    }

    await tx.inventoryAllocation.createMany({ data: allocations });

    await audit({
      companyId,
      userId,
      entityType: "SALES_ORDER",
      entityId: orderId,
      action: "INVENTORY_ALLOCATED",
      metadata: { allocations }
    }, tx);

    await audit({
      companyId,
      userId,
      entityType: "SALES_ORDER",
      entityId: orderId,
      action: "INVENTORY_DEDUCTED",
      metadata: { allocations: allocations.filter(a => !a.isBackorder) }
    }, tx);

    return allocations;
  });
}