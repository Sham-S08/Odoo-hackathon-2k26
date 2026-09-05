import { formatCurrency } from "../../utils/formatCurrency";

export default function QuotationDetails({ quotation }) {
  return (
    <div className="overflow-hidden rounded-xl border border-royal-100 bg-white">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-royal-100 bg-royal-50/60">
            <th className="px-4 py-3 font-medium text-royal-500">Item</th>
            <th className="px-4 py-3 font-medium text-royal-500">Qty</th>
            <th className="px-4 py-3 font-medium text-royal-500">Discount</th>
            <th className="px-4 py-3 font-medium text-royal-500">Total</th>
          </tr>
        </thead>
        <tbody>
          {quotation.items.map((item) => (
            <tr key={item.productId} className="border-b border-royal-50 last:border-0">
              <td className="px-4 py-3 text-royal-800">{item.name}</td>
              <td className="px-4 py-3 text-royal-600">{item.quantity}</td>
              <td className="px-4 py-3 text-royal-600">{item.discountPercent}%</td>
              <td className="px-4 py-3 font-medium text-royal-900">
                {formatCurrency(item.unitPrice * item.quantity * (1 - item.discountPercent / 100))}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3} className="px-4 py-3 text-right font-medium text-royal-500">
              Total
            </td>
            <td className="px-4 py-3 font-display font-semibold text-royal-900">
              {formatCurrency(quotation.total)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
