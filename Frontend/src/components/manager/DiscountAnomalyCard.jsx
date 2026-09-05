import { ChevronRight, TrendingUp } from "lucide-react";
import Badge from "../common/Badge";

export default function DiscountAnomalyCard({ anomaly, onOpen }) {
  const isCritical = anomaly.riskLevel === "CRITICAL" || anomaly.riskLevel === "HIGH";

  return (
    <button
      onClick={onOpen}
      className={`w-full rounded-xl border p-4 text-left transition-all hover:shadow-md ${
        isCritical 
          ? "border-rose-200 bg-rose-50/40 hover:bg-rose-50" 
          : "border-amber-100 bg-amber-50/40 hover:bg-amber-50"
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="font-medium text-slate-800">{anomaly.repName}</p>
          <p className="text-xs text-slate-400">{anomaly.customer}</p>
        </div>
        <TrendingUp className={`h-4 w-4 ${isCritical ? "text-rose-500" : "text-amber-500"}`} />
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-600">{anomaly.product}</p>
          <div className="mt-1 flex items-center gap-3">
            <span className="text-sm font-medium text-rose-600">{anomaly.currentDiscount}%</span>
            <span className="text-xs text-slate-400">vs avg {anomaly.avgDiscount}%</span>
          </div>
        </div>
        <div className="text-right">
          <Badge tone={isCritical ? "rose" : "amber"}>
            +{anomaly.difference}% deviation
          </Badge>
          <ChevronRight className="mt-1 h-4 w-4 text-slate-300" />
        </div>
      </div>

      <div className="mt-2">
        <Badge tone={isCritical ? "rose" : "amber"}>{anomaly.riskLevel}</Badge>
      </div>
    </button>
  );
}