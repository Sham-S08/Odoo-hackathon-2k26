import Badge from "../common/Badge";
import { formatCurrency } from "../../utils/formatCurrency";

const STAGE_TONES = {
  Draft: "slate",
  "Pending Approval": "amber",
  "Under Negotiation": "plum",
  Approved: "green",
  Confirmed: "royal",
};

export default function RecentQuotations({ quotations = [], onOpen }) {
  return (
    <div className="divide-y divide-royal-50">
      {quotations.map((q) => (
        <button
          key={q.id}
          onClick={() => onOpen?.(q)}
          className="flex w-full items-center justify-between py-3 text-left hover:bg-royal-50/60"
        >
          <div>
            <p className="text-sm font-medium text-royal-900">{q.customerName}</p>
            <p className="text-xs text-royal-400">{q.id}</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge tone={STAGE_TONES[q.stage] || "slate"}>{q.stage}</Badge>
            <span className="text-sm font-medium text-royal-900">
              {formatCurrency(q.total)}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}
