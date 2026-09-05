import { CheckCircle2, Info, TriangleAlert, X, XCircle } from "lucide-react";

const ICONS = {
  success: CheckCircle2,
  error: XCircle,
  warning: TriangleAlert,
  info: Info,
};

const TONES = {
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  error: "border-rose-200 bg-rose-50 text-rose-700",
  warning: "border-amber-200 bg-amber-50 text-amber-700",
  info: "border-royal-200 bg-white text-royal-700",
};

export default function Toast({ children, variant = "info", onClose }) {
  const Icon = ICONS[variant] || Info;
  return (
    <div
      className={`flex w-80 items-start gap-2 rounded-xl border px-4 py-3 shadow-panel ${TONES[variant]}`}
    >
      <Icon className="mt-0.5 h-4 w-4 shrink-0" />
      <p className="flex-1 text-sm">{children}</p>
      <button onClick={onClose} className="text-current/60 hover:text-current">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
