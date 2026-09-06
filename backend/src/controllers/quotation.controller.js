import prisma from "../config/prisma.js";
import { createQuotation } from "../services/quotation/quotation.service.js";
import { generateDealHealth } from "../services/ai/dealHealth.service.js";
import { audit } from "../utils/audit.js";

async function getAssignedPendingApproval(quotationId, role) {
  return prisma.approval.findFirst({
    where: { quotationId, status: "PENDING", approverRole: role },
    orderBy: { createdAt: "desc" }
  });
}

function approvalPermissionError(req, res) {
  return res.status(403).json({
    success: false,
    error: {
      code: "APPROVAL_NOT_ASSIGNED",
      message: "This quotation is assigned to a different approval role",
      details: { assignedRoles: ["MANAGER", "FINANCE_MANAGER"] }
    },
    requestId: req.requestId
  });
}

export async function create(req, res, next) {
  try {
    const result = await createQuotation({
      companyId: req.user.companyId,
      userId: req.user.id,
      ...req.body
    });
    res.status(201).json({
      success: true,
      data: result,
      message: "Quotation created successfully",
      requestId: req.requestId
    });
  } catch (e) { next(e); }
}

export async function list(req, res, next) {
  try {
    const where = { companyId: req.user.companyId };
    if (req.user.role === "CUSTOMER" && req.user.customerId) where.customerId = req.user.customerId;
    if (req.user.role === "CUSTOMER" && !req.user.customerId) {
      return res.json({ success: true, data: [], message: "No customer profile is linked to this account", requestId: req.requestId });
    }
    const data = await prisma.quotation.findMany({
      where,
      include: { customer: true, createdBy: true, negotiations: { orderBy: { createdAt: "desc" } }, items: { include: { product: true } }, dealHealth: { orderBy: { createdAt: "desc" }, take: 1 } },
      orderBy: { createdAt: "desc" }
    });
    res.json({ success: true, data, message: "Quotations fetched", requestId: req.requestId });
  } catch (e) { next(e); }
}

export async function get(req, res, next) {
  try {
    const q = await prisma.quotation.findFirst({
      where: {
        id: req.params.id,
        companyId: req.user.companyId,
        ...(req.user.role === "CUSTOMER" && req.user.customerId ? { customerId: req.user.customerId } : {})
      },
      include: {
        customer: true,
        createdBy: true,
        items: { include: { product: true } },
        versions: { orderBy: { versionNumber: "desc" } },
        approvals: { orderBy: { createdAt: "desc" } },
        negotiations: { orderBy: { createdAt: "desc" } },
        dealHealth: { orderBy: { createdAt: "desc" } },
        salesOrder: true
      }
    });
    if (!q) return res.status(404).json({ success: false, error: { code: "QUOTATION_NOT_FOUND", message: "Quotation not found", details: {} }, requestId: req.requestId });
    res.json({ success: true, data: q, message: "Quotation fetched", requestId: req.requestId });
  } catch (e) { next(e); }
}

export async function submit(req, res, next) {
  try {
    const q = await prisma.quotation.findFirst({ where: { id: req.params.id, companyId: req.user.companyId } });
    if (!q) return res.status(404).json({ success: false, error: { code: "QUOTATION_NOT_FOUND", message: "Quotation not found", details: {} }, requestId: req.requestId });
    if (!["DRAFT", "REJECTED"].includes(q.status)) return res.status(409).json({ success: false, error: { code: "QUOTATION_INVALID_STATUS", message: "Quotation cannot be submitted in its current status", details: { status: q.status } }, requestId: req.requestId });

    const updated = await prisma.quotation.update({ where: { id: q.id }, data: { status: "PENDING_APPROVAL" } });
    await audit({ companyId: req.user.companyId, userId: req.user.id, entityType: "QUOTATION", entityId: q.id, action: "APPROVAL_REQUESTED" });
    res.json({ success: true, data: updated, message: "Quotation submitted for approval", requestId: req.requestId });
  } catch (e) { next(e); }
}

export async function confirm(req, res, next) {
  try {
    const quotation = await prisma.quotation.findFirst({
      where: { id: req.params.id, companyId: req.user.companyId, customerId: req.user.customerId }
    });
    if (!quotation) return res.status(404).json({ success: false, error: { code: "QUOTATION_NOT_FOUND", message: "Quotation not found", details: {} }, requestId: req.requestId });
    if (!["APPROVED", "CUSTOMER_REVIEW"].includes(quotation.status)) {
      return res.status(409).json({ success: false, error: { code: "QUOTATION_INVALID_STATUS", message: "Only an approved quotation can be confirmed", details: { status: quotation.status } }, requestId: req.requestId });
    }
    const updated = await prisma.$transaction(async tx => {
      const result = await tx.quotation.update({ where: { id: quotation.id }, data: { status: "CUSTOMER_ACCEPTED" } });
      await audit({ companyId: req.user.companyId, userId: req.user.id, entityType: "QUOTATION", entityId: quotation.id, action: "CUSTOMER_CONFIRMED_QUOTATION" }, tx);
      return result;
    });
    res.json({ success: true, data: updated, message: "Quotation confirmed", requestId: req.requestId });
  } catch (e) { next(e); }
}

export async function approve(req, res, next) {
  try {
    const q = await prisma.quotation.findFirst({ where: { id: req.params.id, companyId: req.user.companyId } });
    if (!q) return res.status(404).json({ success: false, error: { code: "QUOTATION_NOT_FOUND", message: "Quotation not found", details: {} }, requestId: req.requestId });
    if (q.status !== "PENDING_APPROVAL") return res.status(409).json({ success: false, error: { code: "QUOTATION_INVALID_STATUS", message: "Only pending quotations can be approved", details: { status: q.status } }, requestId: req.requestId });
    const pendingApproval = await getAssignedPendingApproval(q.id, req.user.role);
    if (!pendingApproval) return approvalPermissionError(req, res);

    const updated = await prisma.$transaction(async tx => {
      const result = await tx.quotation.update({ where: { id: q.id }, data: { status: "APPROVED" } });
      await tx.approval.update({ where: { id: pendingApproval.id }, data: { managerId: req.user.id, status: "APPROVED", reason: req.body.reason || null } });
      await audit({ companyId: req.user.companyId, userId: req.user.id, entityType: "QUOTATION", entityId: q.id, action: "QUOTATION_APPROVED", metadata: { reason: req.body.reason || null } }, tx);
      return result;
    });

    res.json({ success: true, data: updated, message: "Quotation approved", requestId: req.requestId });
  } catch (e) { next(e); }
}

export async function reject(req, res, next) {
  try {
    const q = await prisma.quotation.findFirst({ where: { id: req.params.id, companyId: req.user.companyId } });
    if (!q) return res.status(404).json({ success: false, error: { code: "QUOTATION_NOT_FOUND", message: "Quotation not found", details: {} }, requestId: req.requestId });
    if (q.status !== "PENDING_APPROVAL") return res.status(409).json({ success: false, error: { code: "QUOTATION_INVALID_STATUS", message: "Only pending quotations can be rejected", details: { status: q.status } }, requestId: req.requestId });
    const pendingApproval = await getAssignedPendingApproval(q.id, req.user.role);
    if (!pendingApproval) return approvalPermissionError(req, res);

    const updated = await prisma.$transaction(async tx => {
      const result = await tx.quotation.update({ where: { id: q.id }, data: { status: "REJECTED" } });
      await tx.approval.update({ where: { id: pendingApproval.id }, data: { managerId: req.user.id, status: "REJECTED", reason: req.body.reason || null } });
      await audit({ companyId: req.user.companyId, userId: req.user.id, entityType: "QUOTATION", entityId: q.id, action: "QUOTATION_REJECTED", metadata: { reason: req.body.reason || null } }, tx);
      return result;
    });

    res.json({ success: true, data: updated, message: "Quotation rejected", requestId: req.requestId });
  } catch (e) { next(e); }
}

export async function dealHealth(req, res, next) {
  try {
    const data = await generateDealHealth({ quotationId: req.params.id, companyId: req.user.companyId, userId: req.user.id });
    res.status(201).json({ success: true, data, message: "Deal health generated", requestId: req.requestId });
  } catch (e) { next(e); }
}

export async function getDealHealth(req, res, next) {
  try {
    const data = await prisma.dealHealth.findMany({
      where: { quotationId: req.params.id, quotation: { companyId: req.user.companyId } },
      orderBy: { createdAt: "desc" }
    });
    res.json({ success: true, data, message: "Deal health history fetched", requestId: req.requestId });
  } catch (e) { next(e); }
}
