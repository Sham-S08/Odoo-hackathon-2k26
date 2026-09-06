import api from "./axios";

export const quotationsApi = {
  list: (params) => api.get("/quotations", { params }),
  get: (id) => api.get(`/quotations/${id}`),
  create: (payload) => api.post("/quotations", payload),
  submit: (id) => api.post(`/quotations/${id}/submit`),
  confirm: (id) => api.post(`/quotations/${id}/confirm`),
  approve: (id, payload) => api.post(`/quotations/${id}/approve`, payload),
  reject: (id, payload) => api.post(`/quotations/${id}/reject`, payload),
  computeDealHealth: (id) => api.post(`/quotations/${id}/deal-health`),
  getDealHealth: (id) => api.get(`/quotations/${id}/deal-health`),
};
