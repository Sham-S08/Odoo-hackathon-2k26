import { ChevronRight } from "lucide-react";
import Badge from "../common/Badge";
import { formatCurrency } from "../../utils/formatCurrency";

export default function ApprovalCard({ approval, onOpen }) {
  return (
    <button
      onClick={() => onOpen?.(approval)}
      className="flex w-full items-center justify-between rounded-xl border border-royal-100 bg-white p-4 text-left hover:shadow-md"
    >
      <div>
        <p className="text-sm font-medium text-royal-900">{approval.customerName}</p>
        <p className="text-xs text-royal-400">
          {approval.id} &middot; requested by {approval.rep}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Badge tone={approval.level === "Finance" ? "plum" : "amber"}>
          {approval.level} review
        </Badge>
        <span className="text-sm font-semibold text-royal-900">
          {formatCurrency(approval.total)}
        </span>
        <ChevronRight className="h-4 w-4 text-royal-300" />
      </div>
    </button>
  );
}
