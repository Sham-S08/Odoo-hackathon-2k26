import { useCallback, useEffect, useState } from "react";
import { discountRulesApi } from "../api/discountRules.api";

export function useDiscountRules(params) {
  const [discountRules, setDiscountRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await discountRulesApi.list(params);
      setDiscountRules(res.data || []);
    } catch (err) {
      setError(err.message || "Failed to load discount rules");
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(params)]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { discountRules, loading, error, refresh };
}
