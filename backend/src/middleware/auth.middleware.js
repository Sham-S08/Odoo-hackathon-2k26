import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

export async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;

    if (!token) {
      return res.status(401).json({
        success: false,
        error: {
          code: "AUTH_UNAUTHORIZED",
          message: "Authentication required",
          details: {}
        },
        requestId: req.requestId
      });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        companyId: true,
        customerId: true,
        email: true,
        name: true,
        role: true,
        active: true
      }
    });

    if (!user || !user.active) {
      return res.status(401).json({
        success: false,
        error: {
          code: "AUTH_UNAUTHORIZED",
          message: "User is not active",
          details: {}
        },
        requestId: req.requestId
      });
    }

    req.user = user;
    next();
  } catch {
    return res.status(401).json({
      success: false,
      error: {
        code: "AUTH_UNAUTHORIZED",
        message: "Invalid or expired token",
        details: {}
      },
      requestId: req.requestId
    });
  }
}