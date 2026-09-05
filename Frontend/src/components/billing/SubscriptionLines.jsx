import { Repeat } from "lucide-react";
import { formatCurrency } from "../../utils/formatCurrency";

export default function SubscriptionLines({ lines = [] }) {
  return (
    <div className="space-y-2">
      {lines.map((line) => (
        <div
          key={line.productId}
          className="flex items-center justify-between rounded-lg border border-plum-100 bg-plum-50/50 px-4 py-3"
        >
          <div className="flex items-center gap-2">
            <Repeat className="h-4 w-4 text-plum-500" />
            <div>
              <p className="text-sm font-medium text-royal-900">{line.name}</p>
              <p className="text-xs text-royal-400">{line.cadence}</p>
            </div>
          </div>
          <span className="text-sm font-medium text-royal-900">
            {formatCurrency(line.amount)}
          </span>
        </div>
      ))}
    </div>
  );
}
