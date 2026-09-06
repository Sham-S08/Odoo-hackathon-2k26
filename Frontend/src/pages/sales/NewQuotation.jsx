import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/layout/PageHeader";
import QuotationBuilder from "../../components/sales/QuotationBuilder";
import { useQuotationContext } from "../../context/QuotationContext";
import { useNotification } from "../../context/NotificationContext";
import { MOCK_BUILDER_CUSTOMERS, MOCK_BUILDER_PRODUCTS, MOCK_AI_SUGGESTIONS } from "../../utils/salesMockData";

export default function NewQuotation() {
  const navigate = useNavigate();
  const { notify } = useNotification();
  const { draft, totals, setCustomer, addItem, updateItem, removeItem } = useQuotationContext();
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit() {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      notify("Quotation routed for approval based on discount and tier rules", "success");
      navigate("/sales/quotations");
    }, 700);
  }

  return (
    <div>
      <PageHeader
        title="New Quotation"
        description="Pick a customer, add products, and confirm to auto-route for approval"
      />
      <QuotationBuilder
        customers={MOCK_BUILDER_CUSTOMERS}
        products={MOCK_BUILDER_PRODUCTS}
        suggestions={MOCK_AI_SUGGESTIONS}
        draft={draft}
        totals={totals}
        onSetCustomer={setCustomer}
        onAddItem={addItem}
        onUpdateItem={updateItem}
        onRemoveItem={removeItem}
        onSubmit={handleSubmit}
        submitting={submitting}
      />
    </div>
  );
}