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
    const handleCustomersChanged = () => refresh();
    const handleStorageChange = (event) => {
      if (event.key === "customers:changed") refresh();
    };
    const channel = typeof BroadcastChannel !== "undefined" ? new BroadcastChannel("dealflow-customers") : null;
    channel?.addEventListener("message", handleCustomersChanged);
    window.addEventListener("customers:changed", handleCustomersChanged);
    window.addEventListener("storage", handleStorageChange);
    return () => {
      channel?.removeEventListener("message", handleCustomersChanged);
      channel?.close();
      window.removeEventListener("customers:changed", handleCustomersChanged);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [refresh]);

  return { customers, loading, error, refresh };
}
