import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";
import { create, list, get } from "../controllers/invoice.controller.js";

const router = Router();
router.get("/", requireAuth, list);
router.post("/from-order/:orderId", requireAuth, requireRole("SALES", "MANAGER"), create);
router.get("/:id", requireAuth, get);
export default router;