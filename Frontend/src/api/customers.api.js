import api from "./axios";

export const customersApi = {
  list: (params) => api.get("/customers", { params }),
  get: (id) => api.get(`/customers/${id}`),
  create: (payload) => api.post("/customers", payload),
  update: (id, payload) => api.put(`/customers/${id}`, payload),
  remove: (id) => api.delete(`/customers/${id}`),
};
