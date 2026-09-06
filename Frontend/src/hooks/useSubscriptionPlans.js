import { useCallback, useEffect, useState } from "react";
import { subscriptionPlansApi } from "../api/subscriptionPlans.api";

export function useSubscriptionPlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await subscriptionPlansApi.list();
      setPlans(response.data || []);
    } catch (requestError) {
      setError(requestError.message || "Failed to load subscription plans");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { plans, loading, error, refresh };
}
