import { AlertCircle, Shield } from "lucide-react";

const LEVEL_TONES = {
  LOW: { bg: "emerald", text: "emerald", label: "Low Risk" },
  MEDIUM: { bg: "amber", text: "amber", label: "Medium Risk" },
  HIGH: { bg: "rose", text: "rose", label: "High Risk" },
  CRITICAL: { bg: "red", text: "red", label: "Critical" },
};

export default function RiskScore({ score = 0, level = "MEDIUM", reasons = [] }) {
  const tone = LEVEL_TONES[level] || LEVEL_TONES.MEDIUM;
  
  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="relative inline-flex items-center justify-center">
          <div className={`text-5xl font-bold text-${tone.text}-600`}>
            {score}
          </div>
          <span className="text-sm text-slate-400">/100</span>
        </div>
        <div className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-medium bg-${tone.bg}-100 text-${tone.text}-700`}>
          {tone.label}
        </div>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div 
          className={`h-2 rounded-full bg-${tone.bg}-500`}
          style={{ width: `${Math.min(score, 100)}%` }}
        />
      </div>

      {reasons.length > 0 && (
        <div className="mt-3 space-y-1.5 border-t border-blue-100 pt-3">
          <p className="text-xs font-medium text-slate-500">Risk Factors</p>
          {reasons.map((reason, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
              <AlertCircle className="mt-0.5 h-3 w-3 shrink-0 text-amber-500" />
              <span>{reason}</span>
            </div>
          ))}
        </div>
      )}

      <div className="rounded-lg bg-blue-50/60 p-2 text-[11px] text-slate-500">
        <span className="font-medium text-blue-600">Note:</span> AI-generated risk score is advisory only.
        Final decision is yours.
      </div>
    </div>
  );
}