import { GitCommitHorizontal } from "lucide-react";
import Card from "../common/Card";
import Badge from "../common/Badge";
import { formatCurrency } from "../../utils/formatCurrency";

const STATUS_TONES = {
  "Active": "blue",
  "Under Negotiation": "amber",
  "Awaiting Confirmation": "purple",
  "Confirmed": "green",
};

export default function VersionHistory({ versions = [] }) {
  return (
    <Card title="Version History">
      <div className="space-y-4">
        {versions.map((v, idx) => (
          <div key={idx} className="flex gap-3 border-b border-blue-50 pb-3 last:border-0">
            <GitCommitHorizontal className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-700">
                  Version {v.versionNumber || v.version}
                </p>
                <Badge tone={STATUS_TONES[v.status] || "slate"}>
                  {v.status}
                </Badge>
              </div>
              <p className="text-sm text-slate-600">
                Total: {formatCurrency(Number(v.total || 0))}
              </p>
              {v.changes && (
                <p className="text-xs text-slate-500 mt-0.5">📝 {v.changes}</p>
              )}
              <p className="text-xs text-slate-400 mt-0.5">
                {new Date(v.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}