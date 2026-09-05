import { LayoutGrid, List } from "lucide-react";

export default function ViewToggle({ view, onViewChange }) {
  return (
    <div className="flex items-center rounded-lg border border-slate-200 bg-white p-0.5">
      <button
        onClick={() => onViewChange("table")}
        className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
          view === "table"
            ? "bg-blue-600 text-white"
            : "text-slate-500 hover:bg-slate-50"
        }`}
      >
        <List className="h-3.5 w-3.5" />
        Table
      </button>
      <button
        onClick={() => onViewChange("cards")}
        className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
          view === "cards"
            ? "bg-blue-600 text-white"
            : "text-slate-500 hover:bg-slate-50"
        }`}
      >
        <LayoutGrid className="h-3.5 w-3.5" />
        Cards
      </button>
    </div>
  );
}