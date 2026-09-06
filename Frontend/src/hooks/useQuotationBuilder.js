import { useState } from "react";
import { quotationsApi } from "../api/quotations.api";
import { useQuotationContext } from "../context/QuotationContext";

export function useQuotationBuilder() {
  const { draft, totals, addItem, updateItem, removeItem, setCustomer, reset } =
    useQuotationContext();
  const [submitting, setSubmitting] = useState(false);
  const [riskPreview, setRiskPreview] = useState(null);

  async function submitQuotation() {
    setSubmitting(true);
    try {
      const payload = {
        customerId: draft.customerId,
        items: draft.items.map((i) => ({
          productId: i.productId,
          quantity: i.quantity,
          discountPercent: i.discountPercent || 0,
        })),
        notes: draft.notes,
      };
      const res = await quotationsApi.create(payload);
      const health = await quotationsApi.computeDealHealth(res.data.quotation?.id || res.data.id);
      return { ...res.data, dealHealth: health.data };
    } finally {
      setSubmitting(false);
    }
  }

  return {
    draft,
    totals,
    addItem,
    updateItem,
    removeItem,
    setCustomer,
    reset,
    submitting,
    submitQuotation,
    riskPreview,
    setRiskPreview,
  };
}
