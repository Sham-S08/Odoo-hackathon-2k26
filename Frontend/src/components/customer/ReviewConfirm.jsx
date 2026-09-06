import { CheckCircle2, AlertTriangle } from "lucide-react";
import Card from "../common/Card";
import Button from "../common/Button";
import { formatCurrency } from "../../utils/formatCurrency";

export default function ReviewConfirm({ quotation, onConfirm, confirmed }) {
  return (
    <Card title="Review & Confirm">
      <div className="space-y-4">
        <div className="rounded-lg bg-blue-50/60 p-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-slate-500">Version</p>
              <p className="font-medium text-slate-800">v{quotation.versionNumber || quotation.version}</p>
            </div>
            <div>
              <p className="text-slate-500">Status</p>
              <p className="font-medium text-slate-800">{quotation.status}</p>
            </div>
            <div>
              <p className="text-slate-500">Total</p>
              <p className="font-semibold text-slate-900">{formatCurrency(quotation.total)}</p>
            </div>
            <div>
              <p className="text-slate-500">Items</p>
              <p className="font-medium text-slate-800">{quotation.items?.length || 0} items</p>
            </div>
          </div>
        </div>

        {/* Summary of changes */}
        {(quotation.versionNumber || quotation.version) > 1 && (
          <div className="rounded-lg bg-amber-50/60 p-3 text-sm">
            <p className="flex items-center gap-2 font-medium text-amber-700">
              <AlertTriangle className="h-4 w-4" />
              Version {quotation.versionNumber || quotation.version} (Negotiated)
            </p>
            <p className="text-amber-600 mt-1">
              Total: {formatCurrency(Number(quotation.total || 0))}
            </p>
          </div>
        )}

        {!confirmed ? (
          <Button 
            variant="primary" 
            icon={CheckCircle2} 
            className="w-full"
            onClick={onConfirm}
          >
            Confirm Quotation
          </Button>
        ) : (
          <div className="rounded-lg bg-emerald-50 p-3 text-center text-emerald-700">
            <CheckCircle2 className="mx-auto h-6 w-6" />
            <p className="mt-1 font-medium">Confirmed!</p>
            <p className="text-sm">Your order is being processed.</p>
          </div>
        )}

        <p className="text-xs text-slate-400">
          ⚠️ Confirming locks in these terms and starts fulfillment.
        </p>
      </div>
    </Card>
  );
}