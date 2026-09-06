import { formatCurrency } from "../../utils/formatCurrency";

export default function QuotationDetails({ quotation }) {
  return (
    <div className="overflow-hidden rounded-xl border border-royal-100 bg-white">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-royal-100 bg-royal-50/60">
            <th className="px-4 py-3 font-medium text-royal-500">Item</th>
            <th className="px-4 py-3 font-medium text-royal-500">Qty</th>
            <th className="px-4 py-3 font-medium text-royal-500">Unit Price</th>
            <th className="px-4 py-3 font-medium text-royal-500">Discount</th>
            <th className="px-4 py-3 font-medium text-royal-500">Total</th>
          </tr>
        </thead>
        <tbody>
          {quotation.items.map((item) => (
            <tr key={item.productId} className="border-b border-royal-50 last:border-0">
              <td className="px-4 py-3 text-royal-800">{item.product?.name || item.name || item.productId}</td>
              <td className="px-4 py-3 text-royal-600">{item.quantity}</td>
              <td className="px-4 py-3 text-royal-600">{formatCurrency(Number(item.unitPrice || 0))}</td>
              <td className="px-4 py-3 text-royal-600">{item.discountPercent}%</td>
              <td className="px-4 py-3 font-medium text-royal-900">
                {formatCurrency(Number(item.lineTotal ?? (item.unitPrice * item.quantity * (1 - item.discountPercent / 100))))}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4} className="px-4 py-3 text-right font-medium text-royal-500">Subtotal</td>
            <td className="px-4 py-3 font-semibold text-royal-900">{formatCurrency(Number(quotation.subtotal || 0))}</td>
          </tr>
          <tr>
            <td colSpan={4} className="px-4 py-2 text-right text-royal-500">Discount</td>
            <td className="px-4 py-2 text-royal-700">-{formatCurrency(Number(quotation.discountTotal || 0))}</td>
          </tr>
          <tr>
            <td colSpan={4} className="px-4 py-2 text-right text-royal-500">Tax</td>
            <td className="px-4 py-2 text-royal-700">{formatCurrency(Number(quotation.taxTotal || 0))}</td>
          </tr>
          <tr className="border-t border-royal-100">
            <td colSpan={4} className="px-4 py-3 text-right font-medium text-royal-500">Grand Total</td>
            <td className="px-4 py-3 font-display font-semibold text-royal-900">{formatCurrency(Number(quotation.total || 0))}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
