import { Inbox } from "lucide-react";

export default function EmptyState({
  icon: Icon = Inbox,
  message = "Nothing here yet",
  description,
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-royal-200 bg-royal-50/40 py-14 text-center">
      <Icon className="h-8 w-8 text-royal-300" />
      <p className="font-medium text-royal-600">{message}</p>
      {description && <p className="max-w-xs text-sm text-royal-400">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
