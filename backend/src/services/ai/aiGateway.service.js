import { quotationAssistant as requestQuotationAssistant, dealHealth as requestDealHealth } from "../ai.service.js";

export function quotationAssistant(body) {
  return requestQuotationAssistant(body);
}

export function dealHealth(body) {
  return requestDealHealth(body);
}