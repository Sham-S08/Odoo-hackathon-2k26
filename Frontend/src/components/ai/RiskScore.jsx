export default function RiskScore({ score = 0 }) {
  const tone =
    score >= 70 ? "bg-rose-500" : score >= 40 ? "bg-amber-500" : "bg-emerald-500";
  const label = score >= 70 ? "High risk" : score >= 40 ? "Watch" : "Healthy";

  return (
    <div>
      <div className="flex items-center justify-between text-xs text-royal-400">
        <span>Blended risk score</span>
        <span className="font-medium text-royal-700">{score}/100</span>
      </div>
      <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-royal-100">
        <div className={`h-full rounded-full ${tone}`} style={{ width: `${score}%` }} />
      </div>
      <p className="mt-1 text-[11px] font-medium text-royal-500">{label}</p>
    </div>
  );
}
