import prisma from "../config/prisma.js";
import { audit } from "../utils/audit.js";

export async function create(req, res, next) {
  try {
    const invoice = await prisma.$transaction(async tx => {
      const order = await tx.salesOrder.findFirst({
        where: { id: req.params.orderId, companyId: req.user.companyId },
        include: { invoice: true }
      });
      if (!order) {
        const e = new Error("Sales order not found"); e.code = "ORDER_NOT_FOUND"; e.statusCode = 404; throw e;
      }
      if (order.invoice) {
        const e = new Error("Invoice already exists"); e.code = "INVOICE_ALREADY_EXISTS"; e.statusCode = 409; throw e;
      }

      const number = `INV-${Date.now()}`;
      const created = await tx.invoice.create({
        data: {
          companyId: req.user.companyId,
          salesOrderId: order.id,
          invoiceNumber: number,
          subtotal: order.total,
          taxTotal: 0,
          total: order.total,
          status: "ISSUED"
        }
      });

      await audit({ companyId: req.user.companyId, userId: req.user.id, entityType: "INVOICE", entityId: created.id, action: "INVOICE_CREATED" }, tx);
      return created;
    });

    res.status(201).json({ success: true, data: invoice, message: "Invoice created", requestId: req.requestId });
  } catch (e) { next(e); }
}

export async function list(req, res, next) {
  try {
    const data = await prisma.invoice.findMany({ where: { companyId: req.user.companyId }, orderBy: { createdAt: "desc" } });
    res.json({ success: true, data, message: "Invoices fetched", requestId: req.requestId });
  } catch (e) { next(e); }
}

export async function get(req, res, next) {
  try {
    const data = await prisma.invoice.findFirst({ where: { id: req.params.id, companyId: req.user.companyId } });
    if (!data) return res.status(404).json({ success: false, error: { code: "INVOICE_NOT_FOUND", message: "Invoice not found", details: {} }, requestId: req.requestId });
    res.json({ success: true, data, message: "Invoice fetched", requestId: req.requestId });
  } catch (e) { next(e); }
}