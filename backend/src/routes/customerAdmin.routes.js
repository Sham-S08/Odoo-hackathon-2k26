import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";
import { makeCrud } from "../controllers/crud.controller.js";

const router = Router();
const customerCrud = makeCrud("customers", { searchable: ["name", "email"] });

router.get("/", requireAuth, customerCrud.list);
router.post("/", requireAuth, requireRole("ADMIN"), customerCrud.create);
router.get("/:id", requireAuth, customerCrud.get);
router.put("/:id", requireAuth, requireRole("ADMIN"), customerCrud.update);
router.delete("/:id", requireAuth, requireRole("ADMIN"), customerCrud.remove);

export default router;
