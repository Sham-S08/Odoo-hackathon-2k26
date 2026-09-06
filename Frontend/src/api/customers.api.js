import api from "./axios";

export const customerApi = {
  // Get customer's quotations
  getQuotations: () => api.get("/customer/quotations"),
  
  // Get specific quotation
  getQuotation: (id) => api.get(`/customer/quotations/${id}`),
  
  // Submit negotiation
  negotiate: (id, payload) => api.post(`/customer/quotations/${id}/negotiate`, payload),
  
  // Confirm quotation
  confirm: (id) => api.post(`/customer/quotations/${id}/confirm`),
  
  // Get customer profile
  getProfile: () => api.get("/customer/profile"),
};

export const customersApi = {
  list: (params) => api.get("/customers", { params }),
  get: (id) => api.get(`/customers/${id}`),
  create: (payload) => api.post("/customers", payload),
  update: (id, payload) => api.put(`/customers/${id}`, payload),
  remove: (id) => api.delete(`/customers/${id}`),
};