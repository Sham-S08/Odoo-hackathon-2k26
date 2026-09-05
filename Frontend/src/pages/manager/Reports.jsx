import { useState } from "react";
import { FileSpreadsheet, FileText } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import ReportFilters from "../../components/admin/ReportFilters";

const MOCK_APPROVAL_PERFORMANCE = [
  { metric: "Pending Approvals", value: 4 },
  { metric: "Approved", value: 12 },
  { metric: "Rejected", value: 2 },
  { metric: "Avg Approval Time", value: "4.2 hours" },
];

const MOCK_DISCOUNT_ANALYSIS = [
  { metric: "Average Discount", value: "12.4%" },
  { metric: "Highest Discount", value: "22%" },
  { metric: "Discount by Rep (Top)", value: "Priya: 14.2%" },
  { metric: "Discount by Category", value: "Hardware: 10%" },
];

export default function Reports() {
  const [period, setPeriod] = useState("This Week");
  const [team, setTeam] = useState("All");
  const [status, setStatus] = useState("All");
  const [category, setCategory] = useState("All");

  return (
    <div>
      <PageHeader 
        title="Manager Reports" 
        description="Approval performance, discount analysis, and deal health metrics"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="secondary" icon={FileText} size="sm">
              Export PDF
            </Button>
            <Button variant="secondary" icon={FileSpreadsheet} size="sm">
              Export XLS
            </Button>
          </div>
        }
      />

      <ReportFilters
        period={period}
        onPeriodChange={setPeriod}
        team={team}
        onTeamChange={setTeam}
        status={status}
        onStatusChange={setStatus}
        category={category}
        onCategoryChange={setCategory}
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card title="Approval Performance">
          <div className="space-y-3">
            {MOCK_APPROVAL_PERFORMANCE.map((item) => (
              <div key={item.metric} className="flex justify-between border-b border-blue-50 pb-2 last:border-0">
                <span className="text-sm text-slate-600">{item.metric}</span>
                <span className="text-sm font-medium text-slate-800">{item.value}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Discount Analysis">
          <div className="space-y-3">
            {MOCK_DISCOUNT_ANALYSIS.map((item) => (
              <div key={item.metric} className="flex justify-between border-b border-blue-50 pb-2 last:border-0">
                <span className="text-sm text-slate-600">{item.metric}</span>
                <span className="text-sm font-medium text-slate-800">{item.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="Deal Health Summary" className="mt-5">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-amber-50/60 p-3 text-center">
            <p className="text-2xl font-semibold text-amber-600">5</p>
            <p className="text-xs text-slate-500">At-Risk Deals</p>
          </div>
          <div className="rounded-lg bg-rose-50/60 p-3 text-center">
            <p className="text-2xl font-semibold text-rose-600">3</p>
            <p className="text-xs text-slate-500">Stalled Deals</p>
          </div>
          <div className="rounded-lg bg-red-50/60 p-3 text-center">
            <p className="text-2xl font-semibold text-red-600">2</p>
            <p className="text-xs text-slate-500">Discount Anomalies</p>
          </div>
        </div>
      </Card>
    </div>
  );
}