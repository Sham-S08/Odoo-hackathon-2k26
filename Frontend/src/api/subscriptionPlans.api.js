import api from "./axios";

export const subscriptionPlansApi = {
  list: () => api.get("/subscription-plans"),
  create: (payload) => api.post("/subscription-plans", payload),
  update: (id, payload) => api.put(`/subscription-plans/${id}`, payload),
  remove: (id) => api.delete(`/subscription-plans/${id}`),
};
