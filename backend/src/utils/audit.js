import prisma from "../config/prisma.js";

export async function audit({
  companyId,
  userId,
  entityType,
  entityId,
  action,
  metadata = {}
}, tx = prisma) {
  return tx.auditLog.create({
    data: {
      companyId,
      userId: userId || null,
      entityType,
      entityId,
      action,
      metadata
    }
  });
}