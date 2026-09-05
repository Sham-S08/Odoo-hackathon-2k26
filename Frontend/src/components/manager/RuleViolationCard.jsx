import { TriangleAlert } from "lucide-react";

export default function RuleViolationCard({ violation }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-amber-100 bg-amber-50 p-3">
      <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
      <div className="text-sm">
        <p className="font-medium text-amber-800">{violation.line}</p>
        <p className="text-amber-600">
          {violation.given}% given, {violation.allowed}% allowed &middot;{" "}
          {violation.given - violation.allowed} points over
        </p>
      </div>
    </div>
  );
}
