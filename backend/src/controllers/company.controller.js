import prisma from "../config/prisma.js";

export async function getCompany(req, res, next) {
  try {
    const company = await prisma.company.findUnique({ where: { id: req.user.companyId } });
    res.json({ success: true, data: company, message: "Company fetched", requestId: req.requestId });
  } catch (e) { next(e); }
}

export async function updateCompany(req, res, next) {
  try {
    const company = await prisma.company.update({
      where: { id: req.user.companyId },
      data: { name: req.body.name }
    });
    res.json({ success: true, data: company, message: "Company updated", requestId: req.requestId });
  } catch (e) { next(e); }
}