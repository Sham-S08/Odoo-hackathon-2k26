import { MessageSquare } from "lucide-react";
import { formatDateTime } from "../../utils/formatDate";

export default function CommentBox({ comments = [] }) {
  return (
    <div className="space-y-3">
      {comments.map((c, idx) => (
        <div key={idx} className="flex gap-2">
          <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-royal-300" />
          <div className="rounded-lg bg-royal-50 px-3 py-2 text-sm">
            <p className="font-medium text-royal-800">{c.author}</p>
            <p className="text-royal-600">{c.text}</p>
            <p className="mt-0.5 text-[11px] text-royal-400">{formatDateTime(c.timestamp)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
