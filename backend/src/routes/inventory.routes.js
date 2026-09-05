import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";
import { list, byProduct, update } from "../controllers/inventory.controller.js";

const router = Router();
router.get("/", requireAuth, list);
router.get("/:productId", requireAuth, byProduct);
router.put("/:id", requireAuth, requireRole("ADMIN"), update);
export default router;