const timeout = Number(process.env.AI_SERVICE_TIMEOUT_MS || 15000);

async function callAI(path, body) {
  const base = process.env.AI_SERVICE_URL;
  if (!base) {
    const e = new Error("AI service is not configured");
    e.code = "AI_SERVICE_UNAVAILABLE"; e.statusCode = 503; throw e;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(`${base}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal
    });

    if (!response.ok) {
      const e = new Error(`AI service returned ${response.status}`);
      e.code = "AI_SERVICE_UNAVAILABLE"; e.statusCode = 503; throw e;
    }

    const data = await response.json();
    return data;
  } catch (err) {
    if (err.name === "AbortError") {
      const e = new Error("AI service timed out");
      e.code = "AI_SERVICE_TIMEOUT"; e.statusCode = 503; throw e;
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

export function quotationAssistant(body) {
  return callAI("/v1/quotation-assistant", body);
}

export function dealHealth(body) {
  return callAI("/v1/deal-health", body);
}