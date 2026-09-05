import { ArrowDownRight, ArrowUpRight } from "lucide-react";

const TONES = {
  royal: "bg-royal-50 text-royal-600",
  plum: "bg-plum-50 text-plum-600",
  emerald: "bg-emerald-50 text-emerald-600",
  amber: "bg-amber-50 text-amber-600",
};

export default function StatCard({ label, value, change, icon: Icon, tone = "royal" }) {
  const positive = change >= 0;
  return (
    <div className="rounded-2xl border border-royal-100 bg-white p-5 shadow-panel">
      <div className="flex items-center justify-between">
        <p className="text-sm text-royal-400">{label}</p>
        <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${TONES[tone] || TONES.royal}`}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <p className="mt-2 font-display text-2xl font-semibold text-royal-900">{value}</p>
      {change !== undefined && (
        <p
          className={`mt-1 flex items-center gap-1 text-xs font-medium ${
            positive ? "text-emerald-600" : "text-rose-600"
          }`}
        >
          {positive ? (
            <ArrowUpRight className="h-3 w-3" />
          ) : (
            <ArrowDownRight className="h-3 w-3" />
          )}
          {Math.abs(change)}% vs last period
        </p>
      )}
    </div>
  );
}
