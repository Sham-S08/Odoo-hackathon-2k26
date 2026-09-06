import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import companyRoutes from "./routes/company.routes.js";
import userRoutes from "./routes/users.routes.js";
import productRoutes from "./routes/products.routes.js";
import customerRoutes from "./routes/customerAdmin.routes.js";
import discountRuleRoutes from "./routes/discountRules.routes.js";
import warehouseRoutes from "./routes/warehouses.routes.js";
import inventoryRoutes from "./routes/inventory.routes.js";
import quotationRoutes from "./routes/quotations.routes.js";
import approvalRoutes from "./routes/approvals.routes.js";
import negotiationRoutes from "./routes/negotiations.routes.js";
import orderRoutes from "./routes/orders.routes.js";
import invoiceRoutes from "./routes/invoices.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import customerPortalRoutes from "./routes/customers.routes.js";
import subscriptionPlanRoutes from "./routes/subscriptionPlans.routes.js";
import { errorHandler, notFound } from "./middleware/error.middleware.js";
import { requestIdMiddleware } from "./utils/requestId.js";

const app = express();

app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(",") || "*",
  credentials: true
}));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));
app.use(requestIdMiddleware);

app.get("/health", (_req, res) => {
  res.json({
    success: true,
    data: { service: "DealFlow360 API", status: "healthy" },
    message: "API is running"
  });
});

const api = "/api/v1";
app.use(`${api}/auth`, authRoutes);
app.use(`${api}/company`, companyRoutes);
app.use(`${api}/users`, userRoutes);
app.use(`${api}/products`, productRoutes);
app.use(`${api}/customers`, customerRoutes);
app.use(`${api}/discount-rules`, discountRuleRoutes);
app.use(`${api}/warehouses`, warehouseRoutes);
app.use(`${api}/inventory`, inventoryRoutes);
app.use(`${api}/quotations`, quotationRoutes);
app.use(`${api}/approvals`, approvalRoutes);
app.use(`${api}/negotiations`, negotiationRoutes);
app.use(`${api}/orders`, orderRoutes);
app.use(`${api}/invoices`, invoiceRoutes);
app.use(`${api}/ai`, aiRoutes);
app.use(`${api}/subscription-plans`, subscriptionPlanRoutes);

// Customer portal endpoints use the same versioned API base as the frontend.
app.use(`${api}/customer`, customerPortalRoutes);
app.use("/api/customer", customerPortalRoutes);

app.use(notFound);
app.use(errorHandler);
export default app;