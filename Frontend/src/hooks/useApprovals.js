import { useCallback, useEffect, useState } from "react";
import { approvalsApi } from "../api/approvals.api";

export function useApprovals(params) {
  const [approvals, setApprovals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await approvalsApi.list(params);
      setApprovals(res.data || []);
    } catch (err) {
      setError(err.message || "Failed to load approvals");
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(params)]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { approvals, loading, error, refresh };
}
