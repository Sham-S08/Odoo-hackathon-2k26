import { Clock, TriangleAlert } from "lucide-react";
import { formatCurrency } from "../../utils/formatCurrency";

export default function StalledDeals({ deals = [], onOpen }) {
  return (
    <div className="space-y-2">
      {deals.map((deal) => (
        <button
          key={deal.id}
          onClick={() => onOpen?.(deal)}
          className="flex w-full items-center justify-between rounded-lg border border-amber-100 bg-amber-50 px-4 py-3 text-left hover:bg-amber-100/70"
        >
          <div className="flex items-center gap-2">
            <TriangleAlert className="h-4 w-4 text-amber-500" />
            <div>
              <p className="text-sm font-medium text-amber-900">{deal.customerName}</p>
              <p className="flex items-center gap-1 text-xs text-amber-600">
                <Clock className="h-3 w-3" />
                Idle {deal.idleDays} days
              </p>
            </div>
          </div>
          <span className="text-sm font-medium text-amber-900">
            {formatCurrency(deal.total)}
          </span>
        </button>
      ))}
    </div>
  );
}
