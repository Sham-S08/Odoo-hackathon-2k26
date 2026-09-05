import { Router } from "express";
import prisma from "../config/prisma.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";

const router = Router();

router.get("/", requireAuth, requireRole("MANAGER", "FINANCE_MANAGER"), async (req, res, next) => {
  try {
    const data = await prisma.quotation.findMany({
      where: {
        companyId: req.user.companyId,
        status: "PENDING_APPROVAL",
        approvals: { some: { status: "PENDING", approverRole: req.user.role } }
      },
      include: { customer: true, items: { include: { product: true } }, dealHealth: { orderBy: { createdAt: "desc" }, take: 1 } },
      orderBy: { updatedAt: "desc" }
    });
    res.json({ success: true, data, message: "Approval queue fetched", requestId: req.requestId });
  } catch (e) { next(e); }
});

router.get("/:id", requireAuth, requireRole("MANAGER", "FINANCE_MANAGER"), async (req, res, next) => {
  try {
    const data = await prisma.quotation.findFirst({
      where: {
        id: req.params.id,
        companyId: req.user.companyId,
        approvals: { some: { status: "PENDING", approverRole: req.user.role } }
      },
      include: { customer: true, items: { include: { product: true } }, versions: true, approvals: true, dealHealth: true }
    });
    if (!data) return res.status(404).json({ success: false, error: { code: "QUOTATION_NOT_FOUND", message: "Quotation not found", details: {} }, requestId: req.requestId });
    res.json({ success: true, data, message: "Approval details fetched", requestId: req.requestId });
  } catch (e) { next(e); }
});

export default router;
