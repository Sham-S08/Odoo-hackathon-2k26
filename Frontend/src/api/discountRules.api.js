import api from "./axios";

export const discountRulesApi = {
  list: (params) => api.get("/discount-rules", { params }),
  get: (id) => api.get(`/discount-rules/${id}`),
  create: (payload) => api.post("/discount-rules", payload),
  update: (id, payload) => api.put(`/discount-rules/${id}`, payload),
  remove: (id) => api.delete(`/discount-rules/${id}`),
};
