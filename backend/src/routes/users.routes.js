import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";
import { makeCrud } from "../controllers/crud.controller.js";

const router = Router();
const c = makeCrud("users", { searchable: ["name", "email"] });
router.get("/", requireAuth, requireRole("ADMIN"), c.list);
router.post("/", requireAuth, requireRole("ADMIN"), c.create);
router.get("/:id", requireAuth, requireRole("ADMIN"), c.get);
router.put("/:id", requireAuth, requireRole("ADMIN"), c.update);
router.delete("/:id", requireAuth, requireRole("ADMIN"), c.remove);
export default router;