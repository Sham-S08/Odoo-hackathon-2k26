import Select from "../common/Select";

const PERIOD_OPTIONS = [
  { value: "Today", label: "Today" },
  { value: "This Week", label: "This Week" },
  { value: "This Month", label: "This Month" },
  { value: "Custom Range", label: "Custom Range" },
];

const TEAM_OPTIONS = [
  { value: "All", label: "All Teams" },
  { value: "Team A", label: "Team A" },
  { value: "Team B", label: "Team B" },
];

const STATUS_OPTIONS = [
  { value: "All", label: "All Status" },
  { value: "Pending", label: "Pending" },
  { value: "Approved", label: "Approved" },
  { value: "Rejected", label: "Rejected" },
];

const CATEGORY_OPTIONS = [
  { value: "All", label: "All Categories" },
  { value: "Hardware", label: "Hardware" },
  { value: "Services", label: "Services" },
  { value: "Subscriptions", label: "Subscriptions" },
];

export default function ReportFilters({
  period,
  onPeriodChange,
  team,
  onTeamChange,
  status,
  onStatusChange,
  category,
  onCategoryChange,
}) {
  return (
    <div className="mb-4 flex flex-wrap items-end gap-3 rounded-xl border border-blue-100 bg-white p-4 shadow-sm">
      <div className="w-40">
        <Select
          label="Period"
          options={PERIOD_OPTIONS}
          value={period}
          onChange={(e) => onPeriodChange(e.target.value)}
        />
      </div>
      <div className="w-44">
        <Select
          label="Sales Team / Rep"
          options={TEAM_OPTIONS}
          value={team}
          onChange={(e) => onTeamChange(e.target.value)}
        />
      </div>
      <div className="w-40">
        <Select
          label="Approval Status"
          options={STATUS_OPTIONS}
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
        />
      </div>
      <div className="w-44">
        <Select
          label="Product / Category"
          options={CATEGORY_OPTIONS}
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2 pt-2">
        <button
          onClick={() => {
            onPeriodChange("This Week");
            onTeamChange("All");
            onStatusChange("All");
            onCategoryChange("All");
          }}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
        >
          Reset
        </button>
      </div>
    </div>
  );
}