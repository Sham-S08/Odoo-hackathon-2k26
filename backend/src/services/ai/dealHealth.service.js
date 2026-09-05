import prisma from "../../config/prisma.js";
import { dealHealth } from "./aiGateway.service.js";
import { audit } from "../../utils/audit.js";
import { approvalRoleForRisk } from "../ruleEngine/index.js";

export async function generateDealHealth({ quotationId, companyId, userId }) {
  const quotation = await prisma.quotation.findFirst({
    where: { id: quotationId, companyId },
    include: {
      customer: true,
      items: { include: { product: true } }
    }
  });

  if (!quotation) {
    const e = new Error("Quotation not found");
    e.code = "QUOTATION_NOT_FOUND"; e.statusCode = 404; throw e;
  }

  const maxDiscount = quotation.items.length
    ? Math.max(...quotation.items.map(i => Number(i.discountPercent)))
    : 0;

  const input = {
    quotationId: quotation.id,
    customer: {
      tier: quotation.customer.tier,
      previousOrderCount: 0,
      previousTotalValue: 0
    },
    financials: {
      subtotal: Number(quotation.subtotal),
      discountPercent: maxDiscount,
      estimatedMarginPercent: Math.max(0, 30 - maxDiscount)
    },
    ruleViolations: quotation.ruleViolations || [],
    dealSize: Number(quotation.subtotal),
    items: quotation.items.map(i => ({
      category: i.product.category,
      quantity: i.quantity,
      discountPercent: Number(i.discountPercent)
    }))
  };

  const result = await dealHealth(input);

  if (
    typeof result?.riskScore !== "number" ||
    !["LOW", "MEDIUM", "HIGH", "CRITICAL"].includes(result?.riskLevel) ||
    !Array.isArray(result?.reasons) ||
    !Array.isArray(result?.recommendations)
  ) {
    const e = new Error("AI returned an invalid deal health response");
    e.code = "AI_INVALID_RESPONSE"; e.statusCode = 503; throw e;
  }

  const saved = await prisma.$transaction(async tx => {
    const health = await tx.dealHealth.create({
      data: {
        quotationId,
        riskScore: result.riskScore,
        riskLevel: result.riskLevel,
        reasons: result.reasons,
        recommendations: result.recommendations,
        rawResponse: result
      }
    });

    const approverRole = approvalRoleForRisk({
      riskScore: result.riskScore,
      riskLevel: result.riskLevel,
      violations: quotation.ruleViolations || []
    });

    // Only a still-pending quotation can be rerouted after a new risk assessment.
    const routedApprovals = await tx.approval.updateMany({
      where: { quotationId, status: "PENDING", quotation: { status: "PENDING_APPROVAL" } },
      data: { approverRole }
    });

    await audit({
      companyId,
      userId,
      entityType: "QUOTATION",
      entityId: quotationId,
      action: "DEAL_HEALTH_GENERATED",
      metadata: { ...result, approverRole, routedApprovalCount: routedApprovals.count }
    }, tx);

    return health;
  });

  return saved;
}
