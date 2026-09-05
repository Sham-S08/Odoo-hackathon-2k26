const TONES = {
  blue: "bg-blue-100 text-blue-700",
  slate: "bg-slate-100 text-slate-600",
  green: "bg-emerald-100 text-emerald-700",
  amber: "bg-amber-100 text-amber-700",
  rose: "bg-rose-100 text-rose-700",
  purple: "bg-purple-100 text-purple-700",
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