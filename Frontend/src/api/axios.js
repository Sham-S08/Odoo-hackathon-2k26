import axios from "axios";
import { API_BASE_URL } from "../utils/constants";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("df360_access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("df360_access_token");
    }
    const normalized = error.response?.data?.error || {
      code: "NETWORK_ERROR",
      message: error.message || "Something went wrong. Please try again.",
    };
    return Promise.reject(normalized);
  }
);

export default api;
