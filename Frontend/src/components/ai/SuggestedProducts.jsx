import { Plus, Sparkles, Tag } from "lucide-react";
import Card from "../common/Card";
import { formatCurrency } from "../../utils/formatCurrency";

const SAMPLE_SUGGESTIONS = [
  {
    productId: "prod_201",
    name: "Extended Warranty - 3yr",
    category: "Services",
    unitPrice: 240,
    marginDelta: 96,
    promoted: true,
  },
  {
    productId: "prod_305",
    name: "Wireless Docking Station",
    category: "Hardware",
    unitPrice: 165,
    marginDelta: 58,
    promoted: false,
  },
];

export default function SuggestedProducts({ suggestions = SAMPLE_SUGGESTIONS, onAdd, onDismiss }) {
  return (
    <Card
      title={
        <span className="flex items-center gap-1.5">
          <Sparkles className="h-4 w-4 text-plum-500" />
          Upsell &amp; cross-sell
        </span>
      }
    >
      <div className="space-y-3">
        {suggestions.map((s) => (
          <div key={s.productId} className="rounded-lg border border-royal-100 p-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-royal-900">{s.name}</p>
                <p className="text-xs text-royal-400">{formatCurrency(s.unitPrice)}</p>
              </div>
              {s.promoted && (
                <span className="flex items-center gap-1 rounded-full bg-plum-50 px-2 py-0.5 text-[11px] font-medium text-plum-600">
                  <Tag className="h-3 w-3" />
                  Promoted
                </span>
              )}
            </div>
            <p className="mt-1.5 text-xs font-medium text-emerald-600">
              +{formatCurrency(s.marginDelta)} margin if added
            </p>
            <div className="mt-2 flex items-center gap-2">
              <button
                onClick={() => onAdd?.(s)}
                className="flex items-center gap-1 rounded-md bg-royal-50 px-2.5 py-1 text-xs font-medium text-royal-600 hover:bg-royal-100"
              >
                <Plus className="h-3 w-3" />
                Add to Quote
              </button>
              <button
                onClick={() => onDismiss?.(s)}
                className="rounded-md px-2.5 py-1 text-xs font-medium text-royal-400 hover:bg-royal-50"
              >
                Dismiss
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
