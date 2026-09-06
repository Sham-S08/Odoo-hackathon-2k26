import { useState } from "react";
import { customerApi } from "../api/customers.api";

export function useConfirmQuotation(quotationId) {
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState(null);

  async function confirm() {
    setConfirming(true);
    setError(null);
    try {
      const response = await customerApi.confirm(quotationId);
      return response.data;
    } catch (requestError) {
      setError(requestError.message || "Could not confirm quotation");
      throw requestError;
    } finally {
      setConfirming(false);
    }
  }

  return { confirm, confirming, error };
}
