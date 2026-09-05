import prisma from "../../config/prisma.js";

export async function evaluateDiscount({
  companyId,
  customerTier,
  productCategory,
  requestedDiscount
}) {
  const rules = await prisma.discountRule.findMany({
    where: {
      companyId,
      active: true,
      OR: [
        { customerTier, productCategory },
        { customerTier, productCategory: null },
        { customerTier: null, productCategory },
        { customerTier: null, productCategory: null }
      ]
    },
    orderBy: { maxDiscountPercent: "asc" }
  });

  const matching = rules[0];
  const allowedDiscount = matching ? Number(matching.maxDiscountPercent) : 0;
  const passed = Number(requestedDiscount) <= allowedDiscount;

  return {
    passed,
    requiresApproval: true,
    allowedDiscount,
    violations: passed ? [] : [{
      type: "DISCOUNT_LIMIT",
      requested: Number(requestedDiscount),
      allowed: allowedDiscount,
      severity: "HIGH"
    }]
  };
}

export async function evaluateQuotation({ companyId, customerTier, items }) {
  const violations = [];
  let requiresApproval = true;

  for (const item of items) {
    const result = await evaluateDiscount({
      companyId,
      customerTier,
      productCategory: item.product.category,
      requestedDiscount: item.discountPercent
    });

    if (!result.passed) violations.push(...result.violations.map(v => ({
      ...v,
      productId: item.productId
    })));
  }

  return {
    passed: violations.length === 0,
    requiresApproval,
    violations
  };
}

export function evaluateRiskBand(score) {
  if (score <= 30) return "LOW";
  if (score <= 60) return "MEDIUM";
  if (score <= 80) return "HIGH";
  return "CRITICAL";
}

export function calculateRuleViolations() {
  throw new Error("Use evaluateQuotation/evaluateDiscount for quotation rules.");
}

export function requiresApproval() {
  return true;
}

export function evaluateNegotiation(args) {
  return evaluateQuotation(args);
}

export function evaluateInventory(required, available) {
  return {
    sufficient: available >= required,
    shortage: Math.max(0, required - available)
  };
}