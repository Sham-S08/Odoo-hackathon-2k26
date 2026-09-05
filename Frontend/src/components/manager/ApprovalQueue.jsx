import ApprovalCard from "./ApprovalCard";
import EmptyState from "../common/EmptyState";
import { ShieldCheck } from "lucide-react";

export default function ApprovalQueue({ approvals = [], onOpen }) {
  if (!approvals.length) {
    return <EmptyState icon={ShieldCheck} message="No approvals pending" />;
  }
  return (
    <div className="space-y-3">
      {approvals.map((approval) => (
        <ApprovalCard key={approval.id} approval={approval} onOpen={onOpen} />
      ))}
    </div>
  );
}
