import { CheckCircle2 } from "lucide-react";
import Button from "../common/Button";

export default function AcceptQuotation({ onConfirm, disabled }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-emerald-100 bg-emerald-50 p-4">
      <div>
        <p className="text-sm font-medium text-emerald-800">Ready to move forward?</p>
        <p className="text-xs text-emerald-600">
          Confirming locks in these terms and starts fulfillment.
        </p>
      </div>
      <Button variant="primary" icon={CheckCircle2} disabled={disabled} onClick={onConfirm}>
        Confirm Quotation
      </Button>
    </div>
  );
}
