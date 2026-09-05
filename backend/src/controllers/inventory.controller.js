import prisma from "../config/prisma.js";
import { allocateOrder } from "../services/inventory/inventory.service.js";

export async function list(req, res, next) {
  try {
    const data = await prisma.inventory.findMany({
      where: { companyId: req.user.companyId },
      include: { product: true, warehouse: true },
      orderBy: { createdAt: "desc" }
    });
    res.json({ success: true, data, message: "Inventory fetched", requestId: req.requestId });
  } catch (e) { next(e); }
}

export async function byProduct(req, res, next) {
  try {
    const data = await prisma.inventory.findMany({
      where: { companyId: req.user.companyId, productId: req.params.productId },
      include: { warehouse: true, product: true }
    });
    res.json({ success: true, data, message: "Product inventory fetched", requestId: req.requestId });
  } catch (e) { next(e); }
}

export async function update(req, res, next) {
  try {
    const existing = await prisma.inventory.findFirst({ where: { id: req.params.id, companyId: req.user.companyId } });
    if (!existing) return res.status(404).json({ success: false, error: { code: "INVENTORY_NOT_FOUND", message: "Inventory record not found", details: {} }, requestId: req.requestId });
    const quantity = Number(req.body.quantity);
    if (!Number.isInteger(quantity) || quantity < 0) return res.status(400).json({ success: false, error: { code: "VALIDATION_ERROR", message: "Quantity must be a non-negative integer", details: {} }, requestId: req.requestId });
    const data = await prisma.inventory.update({ where: { id: existing.id }, data: { quantity } });
    res.json({ success: true, data, message: "Inventory updated", requestId: req.requestId });
  } catch (e) { next(e); }
}

export async function allocate(req, res, next) {
  try {
    const data = await allocateOrder({ orderId: req.params.id, companyId: req.user.companyId, userId: req.user.id });
    res.status(201).json({ success: true, data, message: "Warehouse allocation completed", requestId: req.requestId });
  } catch (e) { next(e); }
}

export async function fulfillment(req, res, next) {
  try {
    const data = await prisma.inventoryAllocation.findMany({
      where: { salesOrderId: req.params.id, salesOrder: { companyId: req.user.companyId } },
      include: { warehouse: true, product: true }
    });
    res.json({ success: true, data, message: "Fulfillment fetched", requestId: req.requestId });
  } catch (e) { next(e); }
}