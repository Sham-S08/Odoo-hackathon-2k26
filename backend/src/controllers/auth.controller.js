import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";
import { audit } from "../utils/audit.js";

function sign(user) {
  return jwt.sign({
    sub: user.id,
    companyId: user.companyId,
    role: user.role
  }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "1d" });
}

export async function register(req, res, next) {
  try {
    const { companyName, name, email, password, role = "SALES" } = req.body;
    if (!companyName || !name || !email || !password) {
      return res.status(400).json({ success: false, error: { code: "VALIDATION_ERROR", message: "companyName, name, email and password are required", details: {} }, requestId: req.requestId });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const exists = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (exists) {
      return res.status(409).json({ success: false, error: { code: "EMAIL_ALREADY_EXISTS", message: "Email already exists", details: {} }, requestId: req.requestId });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const company = await prisma.company.create({ data: { name: companyName } });
    const user = await prisma.user.create({
      data: { companyId: company.id, name, email: normalizedEmail, passwordHash, role }
    });

    const token = sign(user);
    await audit({ companyId: company.id, userId: user.id, entityType: "USER", entityId: user.id, action: "USER_LOGIN" });

    return res.status(201).json({
      success: true,
      data: { token, user: { id: user.id, name: user.name, email: user.email, role: user.role, companyId: user.companyId } },
      message: "Registered successfully",
      requestId: req.requestId
    });
  } catch (e) { next(e); }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email: email?.toLowerCase().trim() } });

    if (!user || !user.active || !(await bcrypt.compare(password || "", user.passwordHash))) {
      return res.status(401).json({ success: false, error: { code: "AUTH_INVALID_CREDENTIALS", message: "Invalid email or password", details: {} }, requestId: req.requestId });
    }

    const token = sign(user);
    await audit({ companyId: user.companyId, userId: user.id, entityType: "USER", entityId: user.id, action: "USER_LOGIN" });

    return res.json({
      success: true,
      data: { token, user: { id: user.id, name: user.name, email: user.email, role: user.role, companyId: user.companyId, customerId: user.customerId } },
      message: "Login successful",
      requestId: req.requestId
    });
  } catch (e) { next(e); }
}

export async function me(req, res) {
  res.json({ success: true, data: { user: req.user }, message: "Current user", requestId: req.requestId });
}

export async function refresh(req, res) {
  return res.status(501).json({ success: false, error: { code: "NOT_IMPLEMENTED", message: "Refresh-token rotation is not included in the hackathon MVP", details: {} }, requestId: req.requestId });
}

export async function logout(req, res) {
  res.json({ success: true, data: {}, message: "Logout acknowledged; discard the JWT on the client", requestId: req.requestId });
}