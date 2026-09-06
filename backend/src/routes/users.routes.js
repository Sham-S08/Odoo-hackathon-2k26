import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";
import { makeCrud } from "../controllers/crud.controller.js";
import bcrypt from "bcryptjs";
import prisma from "../config/prisma.js";

const router = Router();
const c = makeCrud("users", { searchable: ["name", "email"] });
const createUser = async (req, res, next) => {
	try {
		const { name, email, password, role = "SALES", active = true } = req.body;
		if (!name || !email || !password) {
			return res.status(400).json({ success: false, error: { code: "VALIDATION_ERROR", message: "name, email and password are required", details: {} }, requestId: req.requestId });
		}
		const normalizedEmail = email.toLowerCase().trim();
		const exists = await prisma.user.findUnique({ where: { email: normalizedEmail } });
		if (exists) {
			return res.status(409).json({ success: false, error: { code: "EMAIL_ALREADY_EXISTS", message: "Email already exists", details: {} }, requestId: req.requestId });
		}
		const passwordHash = await bcrypt.hash(password, 12);
		const data = await prisma.user.create({ data: { companyId: req.user.companyId, name, email: normalizedEmail, passwordHash, role, active: Boolean(active) } });
		const { passwordHash: _passwordHash, ...safeUser } = data;
		res.status(201).json({ success: true, data: safeUser, message: "User created", requestId: req.requestId });
	} catch (e) { next(e); }
};
router.get("/", requireAuth, requireRole("ADMIN"), c.list);
router.post("/", requireAuth, requireRole("ADMIN"), createUser);
router.get("/:id", requireAuth, requireRole("ADMIN"), c.get);
router.put("/:id", requireAuth, requireRole("ADMIN"), c.update);
router.delete("/:id", requireAuth, requireRole("ADMIN"), c.remove);
export default router;