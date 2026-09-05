import { useState } from "react";
import { Check, RotateCcw, X } from "lucide-react";
import Button from "../common/Button";

export default function ApprovalActions({ onDecision }) {
  const [reason, setReason] = useState("");

  return (
    <div className="space-y-3">
      <textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="Add a note for the audit trail (optional)"
        rows={3}
        className="w-full rounded-lg border border-royal-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-royal-300"
      />
      <div className="grid grid-cols-1 gap-2">
        <Button variant="primary" icon={Check} onClick={() => onDecision?.("approve", reason)}>
          Approve
        </Button>
        <Button variant="secondary" icon={RotateCcw} onClick={() => onDecision?.("revise", reason)}>
          Return for revision
        </Button>
        <Button variant="danger" icon={X} onClick={() => onDecision?.("reject", reason)}>
          Reject
        </Button>
      </div>
    </div>
  );
}
