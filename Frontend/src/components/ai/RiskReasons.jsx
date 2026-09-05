import { AlertCircle } from "lucide-react";

export default function RiskReasons({ reasons = [] }) {
  if (!reasons.length) return null;
  return (
    <ul className="space-y-1.5">
      {reasons.map((reason, idx) => (
        <li key={idx} className="flex items-start gap-2 text-sm text-royal-600">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
          {reason}
        </li>
      ))}
    </ul>
  );
}
