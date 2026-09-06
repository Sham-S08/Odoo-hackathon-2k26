import { useCallback, useEffect, useState } from "react";
import { customerApi } from "../api/customers.api";

export function useQuotation(id) {
  const [quotation, setQuotation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const response = await customerApi.getQuotation(id);
      setQuotation(response.data || null);
    } catch (requestError) {
      setError(requestError.message || "Failed to load quotation");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { quotation, loading, error, refresh };
}
