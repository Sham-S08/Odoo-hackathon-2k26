import { useMemo, useState } from "react";
import CustomerSelector from "./CustomerSelector";
import ProductSelector from "./ProductSelector";
import Cart from "./Cart";
import QuotationSummary from "./QuotationSummary";
import SuggestedProducts from "../ai/SuggestedProducts";
import Card from "../common/Card";
import Button from "../common/Button";
import { Send } from "lucide-react";
import { CUSTOMER_TIERS } from "../../utils/constants";

export default function QuotationBuilder({
  customers,
  products,
  draft,
  totals,
  onSetCustomer,
  onAddItem,
  onUpdateItem,
  onRemoveItem,
  onSubmit,
  submitting,
}) {
  const [customerQuery, setCustomerQuery] = useState("");
  const [productQuery, setProductQuery] = useState("");

  const tierCeiling = draft.customer
    ? CUSTOMER_TIERS[draft.customer.tier?.toUpperCase()]?.ceiling
    : undefined;

  const categoryCeiling = (item) => {
    if (item.category === "Services") return Math.min(tierCeiling ?? 100, 10);
    return tierCeiling;
  };

  const marginPercent = useMemo(() => {
    if (!totals.subtotal) return 0;
    return (totals.marginTotal / totals.subtotal) * 100;
  }, [totals]);

  function handleAddProduct(product) {
    onAddItem({
      productId: product.id,
      name: product.name,
      category: product.category,
      unitPrice: product.price,
      cost: product.cost,
      quantity: 1,
      discountPercent: 0,
    });
  }

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      <div className="space-y-5 lg:col-span-2">
        <Card title="Customer">
          <CustomerSelector
            customers={customers}
            selected={draft.customer}
            onSelect={onSetCustomer}
            query={customerQuery}
            onQueryChange={setCustomerQuery}
          />
        </Card>

        <Card title="Products">
          <ProductSelector
            products={products}
            query={productQuery}
            onQueryChange={setProductQuery}
            onAdd={handleAddProduct}
          />
        </Card>

        <Card title="Cart" padded={false}>
          <div className="p-2">
            <Cart
              items={draft.items}
              getCeiling={categoryCeiling}
              onUpdate={onUpdateItem}
              onRemove={onRemoveItem}
            />
          </div>
        </Card>
      </div>

      <div className="space-y-5">
        <QuotationSummary totals={totals} marginPercent={marginPercent} />
        <SuggestedProducts onAdd={handleAddProduct} />
        <Button
          variant="gradient"
          icon={Send}
          className="w-full"
          disabled={!draft.customer || !draft.items.length}
          loading={submitting}
          onClick={onSubmit}
        >
          Confirm &amp; Route Quotation
        </Button>
      </div>
    </div>
  );
}
