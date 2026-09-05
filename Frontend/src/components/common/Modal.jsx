import { X } from "lucide-react";

export default function Modal({ open, onClose, title, children, footer, size = "md" }) {
  if (!open) return null;

  const widths = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-royal-900/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={`relative w-full ${widths[size]} rounded-2xl bg-white shadow-panel`}
      >
        <div className="flex items-center justify-between border-b border-royal-100 px-6 py-4">
          <h3 className="font-display text-lg font-semibold text-royal-900">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-royal-400 hover:bg-royal-50 hover:text-royal-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto px-6 py-5">{children}</div>
        {footer && (
          <div className="flex items-center justify-end gap-2 border-t border-royal-100 px-6 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
