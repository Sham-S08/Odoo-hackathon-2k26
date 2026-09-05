import api from "./axios";

export const dashboardApi = {
  summary: (params) => api.get("/dashboard/summary", { params }),
  dealHealth: (params) => api.get("/dashboard/deal-health", { params }),
};
