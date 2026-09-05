import { ArrowUpRight, Clock } from "lucide-react";
import Badge from "../common/Badge";
import { formatCurrency } from "../../utils/formatCurrency";
import { daysSince } from "../../utils/formatDate";

const STAGE_TONES = {
  Draft: "slate",
  "Pending Approval": "amber",
  "Under Negotiation": "plum",
  Approved: "green",
  Rejected: "rose",
  Confirmed: "royal",
  Fulfilled: "green",
};

export default function QuotationCard({ quotation, onOpen }) {
  const idleDays = daysSince(quotation.updatedAt);
  const stalled = idleDays >= 5 && !["Confirmed", "Fulfilled"].includes(quotation.stage);

  return (
    <button
      onClick={() => onOpen?.(quotation)}
      className="group w-full rounded-xl border border-royal-100 bg-white p-4 text-left shadow-panel transition-shadow hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="font-medium text-royal-900">{quotation.customerName}</p>
          <p className="text-xs text-royal-400">{quotation.id}</p>
        </div>
        <ArrowUpRight className="h-4 w-4 text-royal-300 opacity-0 transition-opacity group-hover:opacity-100" />
      </div>

      <p className="mt-3 font-display text-xl font-semibold text-royal-900">
        {formatCurrency(quotation.total)}
      </p>

      <div className="mt-3 flex items-center justify-between">
        <Badge tone={STAGE_TONES[quotation.stage] || "slate"}>{quotation.stage}</Badge>
        {stalled && (
          <span className="flex items-center gap-1 text-xs font-medium text-amber-600">
            <Clock className="h-3 w-3" />
            {idleDays}d idle
          </span>
        )}
      </div>
    </button>
  );
}
