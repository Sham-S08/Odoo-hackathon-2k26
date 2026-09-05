import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";
import { getCompany, updateCompany } from "../controllers/company.controller.js";

const router = Router();
router.get("/", requireAuth, getCompany);
router.put("/", requireAuth, requireRole("ADMIN"), updateCompany);
export default router;