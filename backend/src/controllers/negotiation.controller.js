import prisma from "../config/prisma.js";
import { evaluateQuotation } from "../services/ruleEngine/index.js";
import { generateDealHealth } from "../services/ai/dealHealth.service.js";
import { audit } from "../utils/audit.js";

export async function negotiate(req, res, next) {
  try {
    const { requestedDiscountPercent, message } = req.body;

    const q = await prisma.quotation.findFirst({
      where: { id: req.params.id, companyId: req.user.companyId, customerId: req.user.customerId },
      include: { customer: true, items: { include: { product: true } } }
    });

    if (!q) return res.status(404).json({ success: false, error: { code: "QUOTATION_NOT_FOUND", message: "Quotation not found", details: {} }, requestId: req.requestId });
    if (!["APPROVED", "CUSTOMER_REVIEW", "NEGOTIATION"].includes(q.status)) {
      return res.status(409).json({ success: false, error: { code: "NEGOTIATION_NOT_ALLOWED", message: "Quotation cannot be negotiated in its current status", details: { status: q.status } }, requestId: req.requestId });
    }

    const nextDiscount = Number(requestedDiscountPercent);
    if (nextDiscount < 0 || nextDiscount > 100) {
      return res.status(400).json({ success: false, error: { code: "VALIDATION_ERROR", message: "Discount must be between 0 and 100", details: {} }, requestId: req.requestId });
    }

    const items = q.items.map(i => {
      const gross = Number(i.unitPrice) * i.quantity;
      const discountAmount = gross * nextDiscount / 100;
      const taxable = gross - discountAmount;
      const taxAmount = taxable * Number(i.taxRate) / 100;
      return {
        productId: i.productId,
        quantity: i.quantity,
        unitPrice: Number(i.unitPrice),
        discountPercent: nextDiscount,
        discountAmount,
        taxRate: Number(i.taxRate),
        taxAmount,
        lineTotal: taxable + taxAmount,
        product: i.product
      };
    });

    const subtotal = items.reduce((s, i) => s + i.unitPrice * i.quantity, 0);
    const discountTotal = items.reduce((s, i) => s + i.discountAmount, 0);
    const taxTotal = items.reduce((s, i) => s + i.taxAmount, 0);
    const total = subtotal - discountTotal + taxTotal;

    const ruleResult = await evaluateQuotation({
      companyId: req.user.companyId,
      customerTier: q.customer.tier,
      items
    });

    const version = await prisma.$transaction(async tx => {
      const v = await tx.quotationVersion.create({
        data: {
          quotationId: q.id,
          versionNumber: q.versionNumber + 1,
          status: "PENDING_APPROVAL",
          subtotal,
          discountTotal,
          taxTotal,
          total,
          notes: q.notes,
          snapshot: { items, requestedDiscountPercent: nextDiscount, negotiationMessage: message }
        }
      });

      await tx.quotation.update({
        where: { id: q.id },
        data: {
          versionNumber: v.versionNumber,
          status: "PENDING_APPROVAL",
          subtotal,
          discountTotal,
          taxTotal,
          total,
          rulePassed: ruleResult.passed,
          ruleViolations: ruleResult.violations,
          items: {
            deleteMany: {},
            create: items.map(i => ({
              productId: i.productId,
              quantity: i.quantity,
              unitPrice: i.unitPrice,
              discountPercent: i.discountPercent,
              discountAmount: i.discountAmount,
              taxRate: i.taxRate,
              taxAmount: i.taxAmount,
              lineTotal: i.lineTotal
            }))
          },
          approvals: {
            create: { status: "PENDING" }
          }
        }
      });

      await tx.negotiation.create({
        data: {
          quotationId: q.id,
          customerId: req.user.customerId,
          requestedDiscountPercent: nextDiscount,
          message,
          versionNumber: v.versionNumber
        }
      });

      await audit({
        companyId: req.user.companyId,
        userId: req.user.id,
        entityType: "QUOTATION",
        entityId: q.id,
        action: "CUSTOMER_NEGOTIATED",
        metadata: { requestedDiscountPercent: nextDiscount, message }
      }, tx);

      await audit({
        companyId: req.user.companyId,
        userId: req.user.id,
        entityType: "QUOTATION_VERSION",
        entityId: v.id,
        action: "QUOTATION_VERSION_CREATED",
        metadata: { versionNumber: v.versionNumber, ruleResult }
      }, tx);

      return v;
    });

    // AI is deliberately called only after the deterministic backend recalculation.
    const health = await generateDealHealth({
      quotationId: q.id,
      companyId: req.user.companyId,
      userId: req.user.id
    });

    res.status(201).json({
      success: true,
      data: { version, ruleResult, dealHealth: health },
      message: "Negotiation created and quotation re-evaluated",
      requestId: req.requestId
    });
  } catch (e) { next(e); }
}