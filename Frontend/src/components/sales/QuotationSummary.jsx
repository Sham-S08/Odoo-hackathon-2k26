import { formatCurrency } from "../../utils/formatCurrency";
import MarginIndicator from "./MarginIndicator";

export default function QuotationSummary({ totals, marginPercent }) {
  return (
    <div className="rounded-xl border border-royal-100 bg-white p-5">
      <h3 className="font-display font-semibold text-royal-900">Quotation summary</h3>
      <div className="mt-3 space-y-2 text-sm">
        <div className="flex justify-between text-royal-500">
          <span>Subtotal</span>
          <span>{formatCurrency(totals.subtotal)}</span>
        </div>
        <div className="flex justify-between text-royal-500">
          <span>Discount</span>
          <span>-{formatCurrency(totals.discountTotal)}</span>
        </div>
        <div className="flex justify-between border-t border-royal-100 pt-2 font-semibold text-royal-900">
          <span>Total</span>
          <span>{formatCurrency(totals.total)}</span>
        </div>
      </div>
      <div className="mt-4">
        <MarginIndicator marginAmount={totals.marginTotal} marginPercent={marginPercent} />
      </div>
    </div>
  );
}
