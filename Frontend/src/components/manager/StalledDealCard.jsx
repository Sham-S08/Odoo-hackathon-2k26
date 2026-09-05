import { Clock, Send } from "lucide-react";
import Badge from "../common/Badge";
import { formatCurrency } from "../../utils/formatCurrency";
import Button from "../common/Button";

export default function StalledDealCard({ deal, onOpen, onNudge, onEscalate }) {
  return (
    <div className="rounded-xl border border-amber-100 bg-white p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-medium text-slate-800">{deal.customerName}</p>
          <p className="text-xs text-slate-400">{deal.id} · {deal.rep}</p>
        </div>
        <Badge tone="amber">{deal.stalled}d stalled</Badge>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div>
          <p className="font-display text-lg font-semibold text-slate-800">
            {formatCurrency(deal.total)}
          </p>
          <p className="text-xs text-slate-400">Last activity: {deal.lastActivity}</p>
        </div>
        <Badge tone={deal.riskLevel === "HIGH" ? "rose" : "amber"}>
          {deal.riskLevel}
        </Badge>
      </div>

      <div className="mt-3 flex gap-2">
        <Button variant="secondary" size="sm" onClick={() => onOpen(deal)}>
          Review
        </Button>
        <Button variant="secondary" size="sm" icon={Send} onClick={() => onNudge(deal)}>
          Nudge
        </Button>
        <Button variant="danger" size="sm" onClick={() => onEscalate(deal)}>
          Escalate
        </Button>
      </div>
    </div>
  );
}