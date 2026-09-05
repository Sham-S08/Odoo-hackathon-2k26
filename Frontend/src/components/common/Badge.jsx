const TONES = {
  royal: "bg-royal-100 text-royal-700",
  plum: "bg-plum-100 text-plum-700",
  green: "bg-emerald-100 text-emerald-700",
  amber: "bg-amber-100 text-amber-700",
  rose: "bg-rose-100 text-rose-700",
  slate: "bg-slate-100 text-slate-600",
};

export default function Badge({ children, tone = "slate", icon: Icon }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${TONES[tone] || TONES.slate}`}
    >
      {Icon && <Icon className="h-3 w-3" />}
      {children}
    </span>
  );
}
