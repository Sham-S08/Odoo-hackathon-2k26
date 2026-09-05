import { useCallback, useEffect, useState } from "react";
import { quotationsApi } from "../api/quotations.api";

export function useDealHealth(quotationId) {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    if (!quotationId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await quotationsApi.getDealHealth(quotationId);
      setHealth(res.data);
    } catch (err) {
      setError(err.message || "Failed to load deal health");
    } finally {
      setLoading(false);
    }
  }, [quotationId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { health, loading, error, refresh };
}
