import { ChevronRight, Clock, AlertTriangle } from "lucide-react";
import Badge from "../common/Badge";
import { formatCurrency } from "../../utils/formatCurrency";

const RISK_TONES = {
  LOW: "green",
  MEDIUM: "amber",
  HIGH: "rose",
  CRITICAL: "red",
};

export default function DealHealthCard({ deal, onOpen }) {
  if (!deal) return null;

  const isStalled = deal.stalled > 5;
  const isCritical = deal.riskLevel === "CRITICAL" || deal.riskLevel === "HIGH";

  return (
    <button
      onClick={onOpen}
      className={`w-full rounded-xl border p-4 text-left transition-all hover:shadow-md ${
        isStalled 
          ? "border-amber-200 bg-amber-50/40 hover:bg-amber-50" 
          : isCritical
          ? "border-rose-200 bg-rose-50/40 hover:bg-rose-50"
          : "border-blue-100 bg-white hover:bg-blue-50/40"
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="font-medium text-slate-800">{deal.customerName}</p>
          <p className="text-xs text-slate-400">{deal.id} · {deal.rep}</p>
        </div>
        {isStalled && (
          <div className="flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
            <Clock className="h-3 w-3" />
            {deal.stalled}d idle
          </div>
        )}
        {isCritical && !isStalled && (
          <AlertTriangle className="h-4 w-4 text-rose-500" />
        )}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div>
          <p className="font-display text-lg font-semibold text-slate-800">
            {formatCurrency(deal.total)}
          </p>
          <div className="mt-1 flex items-center gap-2">
            <Badge tone={RISK_TONES[deal.riskLevel] || "slate"}>
              {deal.riskLevel} · {deal.riskScore}/100
            </Badge>
            <Badge tone="slate">{deal.stage}</Badge>
          </div>
        </div>
        <ChevronRight className="h-5 w-5 text-slate-300" />
      </div>

      {isStalled && (
        <div className="mt-2 flex items-center gap-1 text-xs text-amber-600">
          <AlertTriangle className="h-3 w-3" />
          Stalled beyond threshold
        </div>
      )}
    </button>
  );
}