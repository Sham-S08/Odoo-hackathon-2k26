import { useState } from "react";
import { Download, FileSpreadsheet, FileText, Filter } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Select from "../../components/common/Select";
import Input from "../../components/common/Input";
import ReportFilters from "../../components/admin/ReportFilters";

const SAMPLE_SALES_DATA = [
  { period: "Week 1", quotations: 12, orders: 8, revenue: 24800, discount: 3200 },
  { period: "Week 2", quotations: 15, orders: 10, revenue: 31500, discount: 4100 },
  { period: "Week 3", quotations: 9, orders: 7, revenue: 19600, discount: 2800 },
  { period: "Week 4", quotations: 18, orders: 12, revenue: 45200, discount: 5800 },
];

export default function Reports() {
  const [period, setPeriod] = useState("This Week");
  const [team, setTeam] = useState("All");
  const [status, setStatus] = useState("All");
  const [category, setCategory] = useState("All");

  return (
    <div>
      <PageHeader
        title="Reports & Analytics"
        description="Analyze sales performance, discounts, approvals, and deal health"
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

      {/* Filters */}
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

      {/* Report Cards */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card title="Sales Performance" className="lg:col-span-2">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-blue-100">
                  <th className="px-3 py-2 text-left font-medium text-slate-500">Period</th>
                  <th className="px-3 py-2 text-right font-medium text-slate-500">Quotations</th>
                  <th className="px-3 py-2 text-right font-medium text-slate-500">Orders</th>
                  <th className="px-3 py-2 text-right font-medium text-slate-500">Revenue</th>
                  <th className="px-3 py-2 text-right font-medium text-slate-500">Discount</th>
                </tr>
              </thead>
              <tbody>
                {SAMPLE_SALES_DATA.map((row, idx) => (
                  <tr key={idx} className="border-b border-blue-50 last:border-0">
                    <td className="px-3 py-2 text-slate-700">{row.period}</td>
                    <td className="px-3 py-2 text-right text-slate-700">{row.quotations}</td>
                    <td className="px-3 py-2 text-right text-slate-700">{row.orders}</td>
                    <td className="px-3 py-2 text-right font-medium text-slate-800">${row.revenue.toLocaleString()}</td>
                    <td className="px-3 py-2 text-right text-amber-600">${row.discount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="space-y-5">
          <Card title="Discount Analysis">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Average Discount</span>
                <span className="font-medium text-slate-800">12.4%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Highest Discount</span>
                <span className="font-medium text-slate-800">22%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Discount by Rep (Top)</span>
                <span className="font-medium text-slate-800">Priya: 14.2%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Discount by Category</span>
                <span className="font-medium text-slate-800">Hardware: 10%</span>
              </div>
            </div>
          </Card>

          <Card title="Approval Analysis">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Pending</span>
                <span className="font-medium text-slate-800">3</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Approved</span>
                <span className="font-medium text-slate-800">12</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Rejected</span>
                <span className="font-medium text-slate-800">2</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Avg. Approval Time</span>
                <span className="font-medium text-slate-800">4.2 hours</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Deal Health Section */}
      <Card title="Deal Health Overview" className="mt-5">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-lg bg-emerald-50/60 p-3 text-center">
            <p className="text-2xl font-semibold text-emerald-600">8</p>
            <p className="text-xs text-slate-500">At-Risk Deals</p>
          </div>
          <div className="rounded-lg bg-amber-50/60 p-3 text-center">
            <p className="text-2xl font-semibold text-amber-600">5</p>
            <p className="text-xs text-slate-500">Stalled Quotations</p>
          </div>
          <div className="rounded-lg bg-rose-50/60 p-3 text-center">
            <p className="text-2xl font-semibold text-rose-600">3</p>
            <p className="text-xs text-slate-500">Discount Anomalies</p>
          </div>
          <div className="rounded-lg bg-blue-50/60 p-3 text-center">
            <p className="text-2xl font-semibold text-blue-600">12</p>
            <p className="text-xs text-slate-500">Total Quotations</p>
          </div>
        </div>
      </Card>
    </div>
  );
}