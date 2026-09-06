import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/layout/PageHeader";
import QuotationBuilder from "../../components/sales/QuotationBuilder";
import { useQuotationBuilder } from "../../hooks/useQuotationBuilder";
import { useCustomers } from "../../hooks/useCustomers";
import { useProducts } from "../../hooks/useProducts";
import { useNotification } from "../../context/NotificationContext";

export default function NewQuotation() {
  const navigate = useNavigate();
  const { notify } = useNotification();
  const { customers: customerRecords, loading: customersLoading, error: customersError } = useCustomers();
  const { products, loading: productsLoading, error: productsError } = useProducts();
  const {
    draft,
    totals,
    setCustomer,
    addItem,
    updateItem,
    removeItem,
    reset,
    submitting,
    submitQuotation,
  } = useQuotationBuilder();

  async function handleSubmit() {
    try {
      await submitQuotation();
      reset();
      notify("Quotation routed for approval based on discount and tier rules", "success");
      navigate("/sales/quotations");
    } catch (error) {
      notify(error.message || "Could not create quotation", "error");
    }
  }

  const builderProducts = products.map((product) => ({
    ...product,
    price: Number(product.basePrice),
  }));
  const customers = customerRecords.map((customer) => ({
    ...customer,
    tier: customer.tier?.toLowerCase() === "bronze" ? "Bronze" : customer.tier?.toLowerCase() === "gold" ? "Gold" : "Silver",
  }));

  return (
    <div>
      <PageHeader
        title="New Quotation"
        description="Pick a customer, add products, and confirm to auto-route for approval"
      />
      <QuotationBuilder
        customers={customers}
        products={builderProducts}
        draft={draft}
        totals={totals}
        onSetCustomer={setCustomer}
        onAddItem={addItem}
        onUpdateItem={updateItem}
        onRemoveItem={removeItem}
        onSubmit={handleSubmit}
        submitting={submitting || customersLoading || productsLoading}
      />
      {customersError || productsError ? (
        <div className="mt-3 space-y-1 rounded-lg bg-rose-50 p-3 text-sm text-rose-700">
          {customersError ? <p>Customers: {customersError}</p> : null}
          {productsError ? <p>Products: {productsError}</p> : null}
        </div>
      ) : null}
    </div>
  );
}
