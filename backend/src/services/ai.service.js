import axios from "axios";

const client = axios.create({
  baseURL: process.env.AI_SERVICE_URL || "http://localhost:8000",
  timeout: Number(process.env.AI_SERVICE_TIMEOUT_MS || 15000),
  headers: { "Content-Type": "application/json" },
});

function normalizeError(error) {
  const status = error.response?.status;
  const normalized = new Error(
    status ? `AI service returned ${status}` : error.code === "ECONNABORTED" ? "AI service timed out" : "AI service is unavailable"
  );
  normalized.code = error.code === "ECONNABORTED" ? "AI_SERVICE_TIMEOUT" : "AI_SERVICE_UNAVAILABLE";
  normalized.statusCode = 503;
  normalized.details = error.response?.data || {};
  return normalized;
}

async function post(path, payload) {
  try {
    const response = await client.post(path, payload);
    return response.data?.data ?? response.data;
  } catch (error) {
    throw normalizeError(error);
  }
}

export function quotationAssistant(payload) {
  return post("/v1/quotation-assistant", payload);
}

export function dealHealth(payload) {
  return post("/v1/deal-health", payload);
}
