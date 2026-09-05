import { GitCommitHorizontal } from "lucide-react";
import { formatDateTime } from "../../utils/formatDate";

export default function VersionHistory({ versions = [] }) {
  return (
    <ol className="space-y-3 border-l border-royal-100 pl-4">
      {versions.map((v, idx) => (
        <li key={idx} className="relative text-sm">
          <GitCommitHorizontal className="absolute -left-[21px] top-0.5 h-4 w-4 text-royal-400" />
          <p className="font-medium text-royal-800">{v.label}</p>
          <p className="text-xs text-royal-400">{formatDateTime(v.timestamp)}</p>
        </li>
      ))}
    </ol>
  );
}
