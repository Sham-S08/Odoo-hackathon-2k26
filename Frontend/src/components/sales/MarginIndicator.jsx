import { TrendingDown, TrendingUp } from "lucide-react";
import { formatCurrency } from "../../utils/formatCurrency";

export default function MarginIndicator({ marginAmount = 0, marginPercent = 0 }) {
  const healthy = marginPercent >= 20;
  const Icon = healthy ? TrendingUp : TrendingDown;

  return (
    <div
      className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm ${
        healthy ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
      }`}
    >
      <span className="flex items-center gap-1.5 font-medium">
        <Icon className="h-4 w-4" />
        Margin impact
      </span>
      <span className="font-semibold">
        {formatCurrency(marginAmount)} ({marginPercent.toFixed(1)}%)
      </span>
    </div>
  );
}
