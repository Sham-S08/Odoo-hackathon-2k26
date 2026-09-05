import { Activity } from "lucide-react";
import RiskScore from "./RiskScore";

export default function DealHealthCard({ quotation }) {
  return (
    <div className="rounded-xl border border-royal-100 bg-white p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-royal-900">{quotation.customerName}</p>
        <Activity className="h-4 w-4 text-royal-300" />
      </div>
      <div className="mt-3">
        <RiskScore score={quotation.riskScore} />
      </div>
      <p className="mt-2 text-xs text-royal-400">
        Idle for {quotation.idleDays} days &middot; {quotation.stage}
      </p>
    </div>
  );
}
