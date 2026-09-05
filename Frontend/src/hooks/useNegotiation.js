import { useState } from "react";
import { negotiationsApi } from "../api/negotiations.api";

export function useNegotiation(quotationId) {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  async function sendRequest(payload) {
    setSending(true);
    setError(null);
    try {
      const res = await negotiationsApi.send(quotationId, payload);
      return res.data;
    } catch (err) {
      setError(err.message || "Could not send your request");
      throw err;
    } finally {
      setSending(false);
    }
  }

  return { sendRequest, sending, error };
}
