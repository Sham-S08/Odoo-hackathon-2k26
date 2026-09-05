import api from "./axios";

export const negotiationsApi = {
  send: (quotationId, payload) => api.post(`/negotiations/${quotationId}`, payload),
};
