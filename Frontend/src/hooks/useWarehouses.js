import { useCallback, useEffect, useState } from "react";
import { warehousesApi } from "../api/warehouses.api";

export function useWarehouses(params) {
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await warehousesApi.list(params);
      setWarehouses(res.data || []);
    } catch (err) {
      setError(err.message || "Failed to load warehouses");
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(params)]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { warehouses, loading, error, refresh };
}
