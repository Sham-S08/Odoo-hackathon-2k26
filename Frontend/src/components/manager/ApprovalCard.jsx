import { ChevronRight, Clock, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import Badge from "../common/Badge";
import { formatCurrency } from "../../utils/formatCurrency";

const RISK_TONES = {
  LOW: "green",
  MEDIUM: "amber",
  HIGH: "rose",
  CRITICAL: "red",
};

const STATUS_TONES = {
  Pending: "amber",
  Approved: "green",
  Rejected: "rose",
  "Returned for Revision": "blue",
};

export default function ApprovalCard({ approval, onOpen }) {
  // Safety check: if approval is undefined, return null
  if (!approval) {
    return null;
  }

  const isCritical = approval.riskLevel === "CRITICAL" || approval.riskLevel === "HIGH";
  const isPending = approval.status === "Pending";
  const isApproved = approval.status === "Approved";
  const isRejected = approval.status === "Rejected";

  return (
    <button
      onClick={onOpen}
      className={`w-full rounded-xl border p-4 text-left transition-all hover:shadow-md ${
        isCritical && isPending 
          ? "border-rose-200 bg-rose-50/40 hover:bg-rose-50" 
          : isApproved
          ? "border-emerald-200 bg-emerald-50/40 hover:bg-emerald-50"
          : isRejected
          ? "border-rose-200 bg-rose-50/40 hover:bg-rose-50"
          : "border-blue-100 bg-white hover:bg-blue-50/40"
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="font-medium text-slate-800">{approval.customerName}</p>
          <p className="text-xs text-slate-400">{approval.id} · {approval.rep}</p>
        </div>
        <div className="flex items-center gap-2">
          {isApproved && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
          {isRejected && <XCircle className="h-4 w-4 text-rose-500" />}
          {isCritical && isPending && <AlertTriangle className="h-4 w-4 text-rose-500" />}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div>
          <p className="font-display text-xl font-semibold text-slate-800">
            {formatCurrency(approval.total)}
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <Badge tone={RISK_TONES[approval.riskLevel] || "slate"}>
              {approval.riskLevel} · {approval.riskScore}/100
            </Badge>
            <Badge tone={STATUS_TONES[approval.status] || "slate"}>
              {approval.status}
            </Badge>
            {isApproved && approval.approvedBy && (
              <span className="text-xs text-emerald-600">by {approval.approvedBy}</span>
            )}
            {isRejected && approval.rejectedBy && (
              <span className="text-xs text-rose-600">by {approval.rejectedBy}</span>
            )}
          </div>
        </div>
        <ChevronRight className="h-5 w-5 text-slate-300" />
      </div>

      <div className="mt-2 flex items-center gap-4 text-xs text-slate-400">
        <span>{approval.discount}% discount</span>
        <span>·</span>
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {approval.items} items
        </span>
        <span>·</span>
        <span>{approval.category}</span>
        {isApproved && approval.approvedAt && (
          <>
            <span>·</span>
            <span className="text-emerald-600">Approved {new Date(approval.approvedAt).toLocaleDateString()}</span>
          </>
        )}
        {isRejected && approval.rejectedAt && (
          <>
            <span>·</span>
            <span className="text-rose-600">Rejected {new Date(approval.rejectedAt).toLocaleDateString()}</span>
          </>
        )}
      </div>

      {isRejected && approval.rejectionReason && (
        <div className="mt-2 rounded-lg bg-rose-50 p-2 text-xs text-rose-700">
          Reason: {approval.rejectionReason}
        </div>
      )}
    </button>
  );
}