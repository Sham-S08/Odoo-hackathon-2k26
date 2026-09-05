import { CheckCircle2, Circle, CircleDashed, XCircle } from "lucide-react";
import { formatDateTime } from "../../utils/formatDate";

const STEP_ICONS = {
  completed: CheckCircle2,
  current: Circle,
  pending: CircleDashed,
  rejected: XCircle,
  not_required: CheckCircle2,
};

const STEP_TONES = {
  completed: "text-emerald-600",
  current: "text-blue-600",
  pending: "text-slate-300",
  rejected: "text-rose-600",
  not_required: "text-slate-400",
};

const STEP_LABELS = {
  completed: "Completed",
  current: "In Progress",
  pending: "Awaiting",
  rejected: "Rejected",
  not_required: "Not Required",
};

export default function ApprovalChain({ steps = [] }) {
  return (
    <div className="space-y-4">
      {steps.map((step, idx) => {
        const Icon = STEP_ICONS[step.status] || CircleDashed;
        const tone = STEP_TONES[step.status] || STEP_TONES.pending;
        const label = STEP_LABELS[step.status] || STEP_LABELS.pending;
        
        return (
          <div key={step.step} className="flex items-start gap-4">
            <div className="flex flex-col items-center">
              <Icon className={`h-5 w-5 ${tone}`} />
              {idx < steps.length - 1 && (
                <div className={`mt-1 h-8 w-0.5 ${
                  step.status === "completed" ? "bg-emerald-300" : "bg-slate-200"
                }`} />
              )}
            </div>
            <div className={`flex-1 ${step.status === "current" ? "rounded-lg bg-blue-50/60 p-3" : "py-0.5"}`}>
              <div className="flex items-center justify-between">
                <p className={`text-sm font-medium ${
                  step.status === "current" ? "text-blue-700" : "text-slate-700"
                }`}>
                  {step.step}
                </p>
                <span className="text-xs text-slate-400">
                  {step.user || label}
                </span>
              </div>
              {step.timestamp && (
                <p className="text-xs text-slate-400">{formatDateTime(step.timestamp)}</p>
              )}
              {step.status === "current" && (
                <p className="mt-1 text-xs text-blue-600 font-medium">Awaiting your action</p>
              )}
              {step.note && (
                <p className="mt-1 text-xs text-rose-600">{step.note}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}