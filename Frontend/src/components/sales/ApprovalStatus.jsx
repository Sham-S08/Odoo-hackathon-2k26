import { CheckCircle2, CircleDashed, XCircle } from "lucide-react";

const STEP_ICON = {
  approved: CheckCircle2,
  rejected: XCircle,
  pending: CircleDashed,
};

const STEP_TONE = {
  approved: "text-emerald-600",
  rejected: "text-rose-600",
  pending: "text-royal-300",
};

export default function ApprovalStatus({ steps = [] }) {
  return (
    <div className="space-y-3">
      {steps.map((step, idx) => {
        const Icon = STEP_ICON[step.status] || CircleDashed;
        return (
          <div key={step.name} className="flex items-start gap-3">
            <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${STEP_TONE[step.status]}`} />
            <div>
              <p className="text-sm font-medium text-royal-900">{step.name}</p>
              {step.note && <p className="text-xs text-royal-400">{step.note}</p>}
            </div>
            {idx < steps.length - 1 && <span className="sr-only">then</span>}
          </div>
        );
      })}
    </div>
  );
}
