import { TrendingUp } from "lucide-react";

export default function DiscountAnomalies({ anomalies = [], onOpen }) {
  return (
    <div className="space-y-2">
      {anomalies.map((a) => (
        <button
          key={a.id}
          onClick={() => onOpen?.(a)}
          className="flex w-full items-center justify-between rounded-lg border border-rose-100 bg-rose-50 px-4 py-3 text-left hover:bg-rose-100/70"
        >
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-rose-500" />
            <div>
              <p className="text-sm font-medium text-rose-900">{a.repName}</p>
              <p className="text-xs text-rose-600">
                Gave {a.discountGiven}% vs {a.repAverage}% average
              </p>
            </div>
          </div>
          <span className="text-xs font-medium text-rose-700">{a.quotationId}</span>
        </button>
      ))}
    </div>
  );
}
