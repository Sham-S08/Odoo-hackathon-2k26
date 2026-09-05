import api from "./axios";

export const warehousesApi = {
  list: (params) => api.get("/warehouses", { params }),
  get: (id) => api.get(`/warehouses/${id}`),
  create: (payload) => api.post("/warehouses", payload),
  update: (id, payload) => api.put(`/warehouses/${id}`, payload),
  remove: (id) => api.delete(`/warehouses/${id}`),
};
