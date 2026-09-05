import { History } from "lucide-react";
import { formatDateTime } from "../../utils/formatDate";

export default function AuditTrail({ entries = [] }) {
  return (
    <div className="space-y-3">
      {entries.map((entry, idx) => (
        <div key={idx} className="flex gap-3 text-sm">
          <History className="mt-0.5 h-4 w-4 shrink-0 text-royal-300" />
          <div>
            <p className="text-royal-800">
              <span className="font-medium">{entry.user}</span> {entry.action}
            </p>
            {entry.reason && <p className="text-xs text-royal-400">"{entry.reason}"</p>}
            <p className="text-xs text-royal-300">{formatDateTime(entry.timestamp)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
