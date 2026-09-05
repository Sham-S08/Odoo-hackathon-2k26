import prisma from "../config/prisma.js";
import { audit } from "../utils/audit.js";

export async function fromQuotation(req, res, next) {
  try {
    const quotation = await prisma.quotation.findFirst({
      where: { id: req.params.quotationId, companyId: req.user.companyId, status: "CUSTOMER_ACCEPTED" },
      include: { items: true }
    });

    if (!quotation) return res.status(409).json({ success: false, error: { code: "QUOTATION_INVALID_STATUS", message: "Only accepted quotations can become orders", details: {} }, requestId: req.requestId });

    const existing = await prisma.salesOrder.findUnique({ where: { quotationId: quotation.id } });
    if (existing) return res.status(409).json({ success: false, error: { code: "ORDER_ALREADY_EXISTS", message: "Sales order already exists", details: {} }, requestId: req.requestId });

    const order = await prisma.$transaction(async tx => {
      const created = await tx.salesOrder.create({
        data: {
          companyId: req.user.companyId,
          customerId: quotation.customerId,
          quotationId: quotation.id,
          status: "CREATED",
          total: quotation.total,
          items: {
            create: quotation.items.map(i => ({
              productId: i.productId,
              quantity: i.quantity,
              unitPrice: i.unitPrice,
              lineTotal: i.lineTotal
            }))
          }
        },
        include: { items: true }
      });

      await tx.quotation.update({ where: { id: quotation.id }, data: { status: "CONVERTED" } });
      await audit({ companyId: req.user.companyId, userId: req.user.id, entityType: "SALES_ORDER", entityId: created.id, action: "ORDER_CREATED" }, tx);
      return created;
    });

    res.status(201).json({ success: true, data: order, message: "Sales order created", requestId: req.requestId });
  } catch (e) { next(e); }
}

export async function list(req, res, next) {
  try {
    const data = await prisma.salesOrder.findMany({
      where: { companyId: req.user.companyId, ...(req.user.role === "CUSTOMER" ? { customerId: req.user.customerId } : {}) },
      include: { items: true, inventoryAllocations: true, invoice: true },
      orderBy: { createdAt: "desc" }
    });
    res.json({ success: true, data, message: "Orders fetched", requestId: req.requestId });
  } catch (e) { next(e); }
}

export async function get(req, res, next) {
  try {
    const data = await prisma.salesOrder.findFirst({
      where: { id: req.params.id, companyId: req.user.companyId, ...(req.user.role === "CUSTOMER" ? { customerId: req.user.customerId } : {}) },
      include: { items: true, inventoryAllocations: { include: { warehouse: true, product: true } }, invoice: true }
    });
    if (!data) return res.status(404).json({ success: false, error: { code: "ORDER_NOT_FOUND", message: "Sales order not found", details: {} }, requestId: req.requestId });
    res.json({ success: true, data, message: "Order fetched", requestId: req.requestId });
  } catch (e) { next(e); }
}