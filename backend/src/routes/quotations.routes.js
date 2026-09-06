import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";
import { create, list, get, submit, confirm, approve, reject, dealHealth, getDealHealth } from "../controllers/quotation.controller.js";

const router = Router();
router.get("/", requireAuth, list);
router.post("/", requireAuth, requireRole("SALES"), create);
router.get("/:id", requireAuth, get);
router.post("/:id/submit", requireAuth, requireRole("SALES"), submit);
router.post("/:id/confirm", requireAuth, requireRole("CUSTOMER"), confirm);
router.post("/:id/approve", requireAuth, requireRole("MANAGER", "FINANCE_MANAGER"), approve);
router.post("/:id/reject", requireAuth, requireRole("MANAGER", "FINANCE_MANAGER"), reject);
router.post("/:id/deal-health", requireAuth, dealHealth);
router.get("/:id/deal-health", requireAuth, getDealHealth);
export default router;
