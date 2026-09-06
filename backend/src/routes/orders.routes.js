import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";
import { fromQuotation, list, get } from "../controllers/order.controller.js";
import { allocate, fulfillment } from "../controllers/inventory.controller.js";

const router = Router();
router.get("/", requireAuth, list);
router.post("/from-quotation/:quotationId", requireAuth, requireRole("SALES", "MANAGER"), fromQuotation);
router.get("/:id", requireAuth, get);
router.post("/:id/allocate", requireAuth, requireRole("SALES", "MANAGER", "FINANCE_MANAGER"), allocate);
router.get("/:id/fulfillment", requireAuth, fulfillment);
router.post("/:id/inventory/commit", requireAuth, requireRole("SALES", "MANAGER", "FINANCE_MANAGER"), allocate);
export default router;