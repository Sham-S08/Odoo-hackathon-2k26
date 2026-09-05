import { FileText } from "lucide-react";
import Badge from "../common/Badge";
import PaymentStatus from "./PaymentStatus";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";

export default function InvoiceCard({ invoice }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-royal-100 bg-white p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-royal-50 text-royal-600">
          <FileText className="h-4.5 w-4.5" />
        </div>
        <div>
          <p className="text-sm font-medium text-royal-900">{invoice.id}</p>
          <p className="text-xs text-royal-400">Due {formatDate(invoice.dueDate)}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Badge tone="slate">{formatCurrency(invoice.amount)}</Badge>
        <PaymentStatus status={invoice.status} />
      </div>
    </div>
  );
}
