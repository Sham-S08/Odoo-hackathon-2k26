import { createContext, useContext, useMemo, useState } from "react";

const QuotationContext = createContext(null);

const emptyDraft = {
  customerId: null,
  customer: null,
  items: [],
  notes: "",
};

export function QuotationProvider({ children }) {
  const [draft, setDraft] = useState(emptyDraft);

  function setCustomer(customer) {
    setDraft((d) => ({ ...d, customerId: customer?.id ?? null, customer }));
  }

  function addItem(item) {
    setDraft((d) => {
      const existing = d.items.find((i) => i.productId === item.productId);
      if (existing) {
        return {
          ...d,
          items: d.items.map((i) =>
            i.productId === item.productId
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        };
      }
      return { ...d, items: [...d.items, item] };
    });
  }

  function updateItem(productId, changes) {
    setDraft((d) => ({
      ...d,
      items: d.items.map((i) => (i.productId === productId ? { ...i, ...changes } : i)),
    }));
  }

  function removeItem(productId) {
    setDraft((d) => ({ ...d, items: d.items.filter((i) => i.productId !== productId) }));
  }

  function reset() {
    setDraft(emptyDraft);
  }

  const totals = useMemo(() => {
    const subtotal = draft.items.reduce(
      (sum, i) => sum + i.unitPrice * i.quantity,
      0
    );
    const discountTotal = draft.items.reduce(
      (sum, i) => sum + i.unitPrice * i.quantity * ((i.discountPercent || 0) / 100),
      0
    );
    const marginTotal = draft.items.reduce((sum, i) => {
      const net = i.unitPrice * (1 - (i.discountPercent || 0) / 100);
      const cost = i.cost || i.unitPrice * 0.6;
      return sum + (net - cost) * i.quantity;
    }, 0);
    return {
      subtotal,
      discountTotal,
      total: subtotal - discountTotal,
      marginTotal,
    };
  }, [draft.items]);

  const value = { draft, setCustomer, addItem, updateItem, removeItem, reset, totals };

  return <QuotationContext.Provider value={value}>{children}</QuotationContext.Provider>;
}

export function useQuotationContext() {
  const ctx = useContext(QuotationContext);
  if (!ctx) throw new Error("useQuotationContext must be used within QuotationProvider");
  return ctx;
}
