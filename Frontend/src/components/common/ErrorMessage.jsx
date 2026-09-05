import { AlertTriangle } from "lucide-react";

export default function ErrorMessage({ message = "Something went wrong.", onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-rose-100 bg-rose-50 py-10 text-center">
      <AlertTriangle className="h-6 w-6 text-rose-500" />
      <p className="text-sm text-rose-700">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-sm font-medium text-rose-700 underline underline-offset-2"
        >
          Try again
        </button>
      )}
    </div>
  );
}
