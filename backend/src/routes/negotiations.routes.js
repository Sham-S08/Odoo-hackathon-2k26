import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";
import { negotiate } from "../controllers/negotiation.controller.js";

const router = Router();
router.post("/:id", requireAuth, requireRole("CUSTOMER"), negotiate);
export default router;