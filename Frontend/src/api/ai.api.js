import api from "./axios";

export const aiApi = {
  quotationAssistant: (payload) => api.post("/ai/quotation-assistant", payload),
  dealHealth: (payload) => api.post("/ai/deal-health", payload),
};
