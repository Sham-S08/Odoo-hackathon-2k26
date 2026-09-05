import prisma from "../config/prisma.js";

const modelMap = {
  users: "user",
  products: "product",
  customers: "customer",
  discountRules: "discountRule",
  warehouses: "warehouse",
  inventory: "inventory"
};

export function makeCrud(modelKey, options = {}) {
  const model = modelMap[modelKey];
  const searchable = options.searchable || [];

  return {
    list: async (req, res, next) => {
      try {
        const where = { companyId: req.user.companyId };
        const search = req.query.search?.trim();
        if (search && searchable.length) {
          where.OR = searchable.map(field => ({ [field]: { contains: search } }));
        }
        const data = await prisma[model].findMany({ where, orderBy: { createdAt: "desc" } });
        res.json({ success: true, data, message: `${modelKey} fetched`, requestId: req.requestId });
      } catch (e) { next(e); }
    },
    get: async (req, res, next) => {
      try {
        const data = await prisma[model].findFirst({ where: { id: req.params.id, companyId: req.user.companyId } });
        if (!data) return res.status(404).json({ success: false, error: { code: `${modelKey.toUpperCase()}_NOT_FOUND`, message: "Resource not found", details: {} }, requestId: req.requestId });
        res.json({ success: true, data, message: "Resource fetched", requestId: req.requestId });
      } catch (e) { next(e); }
    },
    create: async (req, res, next) => {
      try {
        const data = await prisma[model].create({ data: { ...req.body, companyId: req.user.companyId } });
        res.status(201).json({ success: true, data, message: `${modelKey} created`, requestId: req.requestId });
      } catch (e) { next(e); }
    },
    update: async (req, res, next) => {
      try {
        const existing = await prisma[model].findFirst({ where: { id: req.params.id, companyId: req.user.companyId } });
        if (!existing) return res.status(404).json({ success: false, error: { code: `${modelKey.toUpperCase()}_NOT_FOUND`, message: "Resource not found", details: {} }, requestId: req.requestId });
        const data = await prisma[model].update({ where: { id: req.params.id }, data: req.body });
        res.json({ success: true, data, message: "Resource updated", requestId: req.requestId });
      } catch (e) { next(e); }
    },
    remove: async (req, res, next) => {
      try {
        const existing = await prisma[model].findFirst({ where: { id: req.params.id, companyId: req.user.companyId } });
        if (!existing) return res.status(404).json({ success: false, error: { code: `${modelKey.toUpperCase()}_NOT_FOUND`, message: "Resource not found", details: {} }, requestId: req.requestId });
        await prisma[model].delete({ where: { id: req.params.id } });
        res.json({ success: true, data: {}, message: "Resource deleted", requestId: req.requestId });
      } catch (e) { next(e); }
    }
  };
}