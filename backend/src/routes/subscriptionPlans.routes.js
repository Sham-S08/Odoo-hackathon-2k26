import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";
import prisma from "../config/prisma.js";

const router = Router();

router.get("/", requireAuth, async (req, res, next) => {
  try {
    const data = await prisma.subscriptionPlan.findMany({
      where: { companyId: req.user.companyId },
      orderBy: { createdAt: "desc" }
    });
    res.json({ success: true, data, message: "Subscription plans fetched", requestId: req.requestId });
  } catch (error) { next(error); }
});

router.post("/", requireAuth, requireRole("ADMIN"), async (req, res, next) => {
  try {
    const { name, cadence, price, prorationRule, cancellationRule, active = true } = req.body;
    const data = await prisma.subscriptionPlan.create({ data: { companyId: req.user.companyId, name, cadence, price: Number(price), prorationRule: prorationRule || null, cancellationRule: cancellationRule || null, active: Boolean(active) } });
    res.status(201).json({ success: true, data, message: "Subscription plan created", requestId: req.requestId });
  } catch (error) { next(error); }
});

router.put("/:id", requireAuth, requireRole("ADMIN"), async (req, res, next) => {
  try {
    const existing = await prisma.subscriptionPlan.findFirst({ where: { id: req.params.id, companyId: req.user.companyId } });
    if (!existing) return res.status(404).json({ success: false, error: { code: "PLAN_NOT_FOUND", message: "Subscription plan not found", details: {} }, requestId: req.requestId });
    const { name, cadence, price, prorationRule, cancellationRule, active } = req.body;
    const data = await prisma.subscriptionPlan.update({ where: { id: existing.id }, data: { name, cadence, price: Number(price), prorationRule: prorationRule || null, cancellationRule: cancellationRule || null, active: Boolean(active) } });
    res.json({ success: true, data, message: "Subscription plan updated", requestId: req.requestId });
  } catch (error) { next(error); }
});

router.delete("/:id", requireAuth, requireRole("ADMIN"), async (req, res, next) => {
  try {
    const existing = await prisma.subscriptionPlan.findFirst({ where: { id: req.params.id, companyId: req.user.companyId } });
    if (!existing) return res.status(404).json({ success: false, error: { code: "PLAN_NOT_FOUND", message: "Subscription plan not found", details: {} }, requestId: req.requestId });
    await prisma.subscriptionPlan.delete({ where: { id: existing.id } });
    res.json({ success: true, data: {}, message: "Subscription plan deleted", requestId: req.requestId });
  } catch (error) { next(error); }
});

export default router;