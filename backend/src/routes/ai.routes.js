import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";
import { assistant, health } from "../controllers/ai.controller.js";

const router = Router();
router.post("/quotation-assistant", requireAuth, requireRole("SALES"), assistant);
router.post("/deal-health", requireAuth, health);
export default router;