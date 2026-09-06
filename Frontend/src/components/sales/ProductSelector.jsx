import { Plus, Search } from "lucide-react";
import Badge from "../common/Badge";
import { formatCurrency } from "../../utils/formatCurrency";

export default function ProductSelector({ products = [], query, onQueryChange, onAdd }) {
  const filtered = products.filter((p) =>
    [p.name, p.sku, p.description, p.category, p.type]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes((query || "").toLowerCase())
  );

  return (
    <div>
      <div className="relative mb-3">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-royal-300" />
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search products across Hardware, Services, Subscriptions"
          className="w-full rounded-lg border border-royal-200 bg-white py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-royal-300"
        />
      </div>
      <div className="grid max-h-80 grid-cols-1 gap-2 overflow-y-auto sm:grid-cols-2">
        {filtered.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between rounded-lg border border-royal-100 bg-white p-3"
          >
            <div>
              <p className="text-sm font-medium text-royal-900">{product.name}</p>
              <p className="text-xs text-royal-400">SKU: {product.sku}</p>
              {product.description ? <p className="mt-1 text-xs text-royal-500">{product.description}</p> : null}
              <div className="mt-1 flex items-center gap-2">
                <Badge tone="slate">{product.category}</Badge>
                <span className="text-xs text-royal-400">{formatCurrency(product.price)}</span>
              </div>
              <p className="mt-1 text-[10px] uppercase tracking-wide text-royal-400">
                {product.type || "Unit"} · {product.active ? "Active" : "Inactive"} · Tax {product.taxRate ?? 0}%
              </p>
            </div>
            <button
              onClick={() => onAdd(product)}
              className="rounded-lg bg-royal-50 p-2 text-royal-600 hover:bg-royal-100"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
