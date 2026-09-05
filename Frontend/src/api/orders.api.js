import api from "./axios";

export const ordersApi = {
  createFromQuotation: (quotationId) =>
    api.post(`/orders/from-quotation/${quotationId}`),
  list: (params) => api.get("/orders", { params }),
  get: (id) => api.get(`/orders/${id}`),
  allocate: (id, payload) => api.post(`/orders/${id}/allocate`, payload),
  getFulfillment: (id) => api.get(`/orders/${id}/fulfillment`),
  commitInventory: (id) => api.post(`/orders/${id}/inventory/commit`),
};
