import { History } from "lucide-react";
import { formatDateTime } from "../../utils/formatDate";

export default function AuditTrail({ entries = [] }) {
  return (
    <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
      {entries.map((entry, idx) => (
        <div key={idx} className="flex gap-3 border-b border-blue-50 pb-3 last:border-0">
          <History className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
          <div className="flex-1 min-w-0">
            <p className="text-sm text-slate-700">
              <span className="font-medium">{entry.user}</span> {entry.action}
            </p>
            <p className="text-xs text-slate-400">{formatDateTime(entry.timestamp)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}