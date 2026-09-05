import { useCallback, useEffect, useState } from "react";
import { invoicesApi } from "../api/invoices.api";

export function useInvoices(params) {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await invoicesApi.list(params);
      setInvoices(res.data || []);
    } catch (err) {
      setError(err.message || "Failed to load invoices");
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(params)]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { invoices, loading, error, refresh };
}
