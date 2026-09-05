import api from "./axios";

export const invoicesApi = {
  createFromOrder: (orderId) => api.post(`/invoices/from-order/${orderId}`),
  list: (params) => api.get("/invoices", { params }),
  get: (id) => api.get(`/invoices/${id}`),
};
