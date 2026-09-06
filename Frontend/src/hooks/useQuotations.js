import { useCallback, useEffect, useState } from "react";
import { customerApi } from "../api/customers.api";

export function useQuotations(params) {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await customerApi.getQuotations(params);
      setQuotations(res.data || []);
    } catch (err) {
      setError(err.message || "Failed to load quotations");
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(params)]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { quotations, loading, error, refresh };
}
