import { formatCurrency } from "../../utils/formatCurrency";

export default function VersionComparison({ previous, current }) {
  const changed = (prev, curr) => prev !== curr;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div className="font-medium text-slate-500">Field</div>
        <div className="font-medium text-slate-500">Previous</div>
        <div className="font-medium text-slate-500">Current</div>
      </div>

      <div className="grid grid-cols-3 gap-4 border-t border-blue-100 pt-3 text-sm">
        <div className="text-slate-600">Total Amount</div>
        <div className={changed(previous.total, current.total) ? "line-through text-slate-400" : "text-slate-600"}>
          {formatCurrency(previous.total)}
        </div>
        <div className={changed(previous.total, current.total) ? "font-medium text-blue-600" : "text-slate-600"}>
          {formatCurrency(current.total)}
          {changed(previous.total, current.total) && (
            <span className="ml-1 text-xs text-amber-600">
              ({current.total > previous.total ? "+" : ""}{formatCurrency(current.total - previous.total)})
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 border-t border-blue-100 pt-3 text-sm">
        <div className="text-slate-600">Discount %</div>
        <div className={changed(previous.discount, current.discount) ? "line-through text-slate-400" : "text-slate-600"}>
          {previous.discount}%
        </div>
        <div className={changed(previous.discount, current.discount) ? "font-medium text-rose-600" : "text-slate-600"}>
          {current.discount}%
          {changed(previous.discount, current.discount) && (
            <span className="ml-1 text-xs text-amber-600">
              (+{current.discount - previous.discount}%)
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 border-t border-blue-100 pt-3 text-sm">
        <div className="text-slate-600">Risk Score</div>
        <div className={changed(previous.riskScore, current.riskScore) ? "line-through text-slate-400" : "text-slate-600"}>
          {previous.riskScore}/100
        </div>
        <div className={changed(previous.riskScore, current.riskScore) ? "font-medium text-rose-600" : "text-slate-600"}>
          {current.riskScore}/100
          {changed(previous.riskScore, current.riskScore) && (
            <span className="ml-1 text-xs text-amber-600">
              (+{current.riskScore - previous.riskScore})
            </span>
          )}
        </div>
      </div>

      <div className="border-t border-blue-100 pt-3">
        <p className="text-xs font-medium text-slate-500 mb-2">Item Changes</p>
        {current.items.map((item, idx) => {
          const prevItem = previous.items.find(p => p.product === item.product);
          const changedQty = prevItem && prevItem.quantity !== item.quantity;
          const changedDisc = prevItem && prevItem.discount !== item.discount;
          
          if (!prevItem) {
            return (
              <div key={idx} className="text-sm text-emerald-600">
                + {item.product} (new item)
              </div>
            );
          }
          
          if (changedQty || changedDisc) {
            return (
              <div key={idx} className="text-sm text-slate-600">
                {item.product}: 
                {changedQty && <span className="text-amber-600"> qty {prevItem.quantity} → {item.quantity}</span>}
                {changedQty && changedDisc && <span className="text-slate-300"> · </span>}
                {changedDisc && <span className="text-amber-600"> discount {prevItem.discount}% → {item.discount}%</span>}
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}