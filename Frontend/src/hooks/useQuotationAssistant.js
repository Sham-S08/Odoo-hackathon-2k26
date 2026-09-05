import { useState } from "react";
import { aiApi } from "../api/ai.api";

export function useQuotationAssistant() {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchSuggestions(payload) {
    setLoading(true);
    setError(null);
    try {
      const res = await aiApi.quotationAssistant(payload);
      setSuggestions(res.data?.suggestions || []);
      return res.data;
    } catch (err) {
      setError(err.message || "Could not load suggestions");
    } finally {
      setLoading(false);
    }
  }

  return { suggestions, loading, error, fetchSuggestions };
}
