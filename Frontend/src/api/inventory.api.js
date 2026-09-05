import api from "./axios";

export const inventoryApi = {
  list: (params) => api.get("/inventory", { params }),
  getForProduct: (productId) => api.get(`/inventory/${productId}`),
  update: (id, payload) => api.put(`/inventory/${id}`, payload),
};
