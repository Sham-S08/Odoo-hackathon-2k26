import { Minus, Plus, Trash2 } from "lucide-react";
import DiscountInput from "./DiscountInput";
import { formatCurrency } from "../../utils/formatCurrency";

export default function CartItem({ item, ceiling, onUpdate, onRemove }) {
  const lineTotal = item.unitPrice * item.quantity * (1 - (item.discountPercent || 0) / 100);

  return (
    <div className="flex items-center gap-4 border-b border-royal-50 py-3 last:border-0">
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-royal-900">{item.name}</p>
        <p className="text-xs text-royal-400">{formatCurrency(item.unitPrice)} / unit</p>
      </div>

      <div className="flex items-center gap-1 rounded-lg border border-royal-200 px-1">
        <button
          onClick={() => onUpdate({ quantity: Math.max(1, item.quantity - 1) })}
          className="p-1.5 text-royal-500 hover:text-royal-700"
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <span className="w-6 text-center text-sm">{item.quantity}</span>
        <button
          onClick={() => onUpdate({ quantity: item.quantity + 1 })}
          className="p-1.5 text-royal-500 hover:text-royal-700"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>

      <DiscountInput
        value={item.discountPercent || 0}
        ceiling={ceiling}
        onChange={(discountPercent) => onUpdate({ discountPercent })}
      />

      <p className="w-24 text-right text-sm font-medium text-royal-900">
        {formatCurrency(lineTotal)}
      </p>

      <button onClick={onRemove} className="p-1.5 text-royal-300 hover:text-rose-500">
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}
