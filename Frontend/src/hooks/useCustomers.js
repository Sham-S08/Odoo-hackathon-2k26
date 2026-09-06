import { useCallback, useEffect, useState } from "react";
import { customersApi } from "../api/customers.api";

export function useCustomers(params) {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await customersApi.list(params);
      setCustomers(res.data || []);
    } catch (err) {
      setError(err.message || "Failed to load customers");
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(params)]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { customers, loading, error, refresh };
}
