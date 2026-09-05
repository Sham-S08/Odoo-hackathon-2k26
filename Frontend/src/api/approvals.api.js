import api from "./axios";

export const approvalsApi = {
  list: (params) => api.get("/approvals", { params }),
  get: (id) => api.get(`/approvals/${id}`),
};
