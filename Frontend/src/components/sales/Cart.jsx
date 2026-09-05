import CartItem from "./CartItem";
import EmptyState from "../common/EmptyState";
import { ShoppingCart } from "lucide-react";

export default function Cart({ items = [], getCeiling, onUpdate, onRemove }) {
  if (!items.length) {
    return (
      <EmptyState
        icon={ShoppingCart}
        message="No products added yet"
        description="Search and add products from the panel to start building this quote."
      />
    );
  }

  return (
    <div className="rounded-xl border border-royal-100 bg-white px-4">
      {items.map((item) => (
        <CartItem
          key={item.productId}
          item={item}
          ceiling={getCeiling?.(item)}
          onUpdate={(changes) => onUpdate(item.productId, changes)}
          onRemove={() => onRemove(item.productId)}
        />
      ))}
    </div>
  );
}
