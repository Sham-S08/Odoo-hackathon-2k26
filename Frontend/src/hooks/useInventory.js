import { useCallback, useEffect, useState } from "react";
import { inventoryApi } from "../api/inventory.api";

export function useInventory(params) {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await inventoryApi.list(params);
      setInventory(res.data || []);
    } catch (err) {
      setError(err.message || "Failed to load inventory");
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(params)]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { inventory, loading, error, refresh };
}
