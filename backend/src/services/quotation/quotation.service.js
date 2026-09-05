import prisma from "../../config/prisma.js";
import { evaluateQuotation } from "../ruleEngine/index.js";
import { audit } from "../../utils/audit.js";

function calculateItem(product, item) {
  const unitPrice = Number(product.basePrice);
  const quantity = Number(item.quantity);
  const discountPercent = Number(item.discountPercent || 0);
  const gross = unitPrice * quantity;
  const discountAmount = gross * discountPercent / 100;
  const taxable = gross - discountAmount;
  const taxAmount = taxable * Number(product.taxRate) / 100;

  return {
    productId: product.id,
    quantity,
    unitPrice,
    discountPercent,
    discountAmount,
    taxRate: Number(product.taxRate),
    taxAmount,
    lineTotal: taxable + taxAmount
  };
}

export async function createQuotation({ companyId, userId, customerId, items, notes }) {
  const customer = await prisma.customer.findFirst({
    where: { id: customerId, companyId, status: "ACTIVE" }
  });
  if (!customer) {
    const e = new Error("Customer not found");
    e.code = "CUSTOMER_NOT_FOUND"; e.statusCode = 404; throw e;
  }

  const productIds = [...new Set(items.map(i => i.productId))];
  const products = await prisma.product.findMany({
    where: { id: { in: productIds }, companyId, active: true }
  });

  if (products.length !== productIds.length) {
    const e = new Error("One or more products were not found");
    e.code = "PRODUCT_NOT_FOUND"; e.statusCode = 404; throw e;
  }

  const byId = new Map(products.map(p => [p.id, p]));
  const calculated = items.map(i => {
    const product = byId.get(i.productId);
    if (!Number.isInteger(Number(i.quantity)) || Number(i.quantity) <= 0) {
      const e = new Error("Quantity must be a positive integer");
      e.code = "VALIDATION_ERROR"; e.statusCode = 400; throw e;
    }
    return calculateItem(product, i);
  });

  const subtotal = calculated.reduce((s, i) => s + i.unitPrice * i.quantity, 0);
  const discountTotal = calculated.reduce((s, i) => s + i.discountAmount, 0);
  const taxTotal = calculated.reduce((s, i) => s + i.taxAmount, 0);
  const total = subtotal - discountTotal + taxTotal;

  const ruleResult = await evaluateQuotation({
    companyId,
    customerTier: customer.tier,
    items: calculated.map(i => ({
      ...i,
      product: byId.get(i.productId)
    }))
  });

  const quotation = await prisma.$transaction(async tx => {
    const q = await tx.quotation.create({
      data: {
        companyId,
        customerId,
        createdById: userId,
        status: "PENDING_APPROVAL",
        versionNumber: 1,
        notes,
        subtotal,
        discountTotal,
        taxTotal,
        total,
        rulePassed: ruleResult.passed,
        ruleViolations: ruleResult.violations,
        items: {
          create: calculated.map(i => ({
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
        versions: {
          create: {
            versionNumber: 1,
            status: "PENDING_APPROVAL",
            subtotal,
            discountTotal,
            taxTotal,
            total,
            notes,
            snapshot: {
              customerId,
              items: calculated
            }
          }
        },
        approvals: {
          create: {
            status: "PENDING"
          }
        }
      },
      include: { items: true, versions: true }
    });

    await audit({
      companyId,
      userId,
      entityType: "QUOTATION",
      entityId: q.id,
      action: "QUOTATION_CREATED",
      metadata: { versionNumber: 1 }
    }, tx);

    await audit({
      companyId,
      userId,
      entityType: "QUOTATION",
      entityId: q.id,
      action: "RULE_EVALUATED",
      metadata: ruleResult
    }, tx);

    return q;
  });

  return { quotation, ruleResult };
}