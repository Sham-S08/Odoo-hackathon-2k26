import { quotationAssistant } from "../services/ai/aiGateway.service.js";
import { generateDealHealth } from "../services/ai/dealHealth.service.js";

export async function assistant(req, res, next) {
  try {
    const data = await quotationAssistant({
      ...req.body,
      companyId: req.user.companyId,
      userId: req.user.id
    });
    res.json({ success: true, data, message: "AI quotation suggestions generated", requestId: req.requestId });
  } catch (e) { next(e); }
}

export async function health(req, res, next) {
  try {
    const data = await generateDealHealth({
      quotationId: req.body.quotationId,
      companyId: req.user.companyId,
      userId: req.user.id
    });
    res.status(201).json({ success: true, data, message: "Deal health generated", requestId: req.requestId });
  } catch (e) { next(e); }
}