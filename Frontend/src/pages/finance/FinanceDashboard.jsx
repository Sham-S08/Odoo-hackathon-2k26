import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  ShieldCheck, 
  Truck, 
  Boxes, 
  CreditCard, 
  FileText,
  AlertTriangle,
  CheckCircle2,
  Clock
} from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import StatCard from "../../components/dashboard/StatCard";
import Card from "../../components/common/Card";
import { MOCK_FINANCE_DASHBOARD } from "../../utils/financeMockData";

export default function FinanceDashboard() {
  const navigate = useNavigate();
  const { stats, approvalOverview, fulfillmentOverview, billingOverview, recentActivity } = MOCK_FINANCE_DASHBOARD;

  return (
    <div>
      <PageHeader 
        title="Finance Dashboard" 
        description="Second-level approvals, fulfillment, and billing overview" 
      />

      {/* KPI Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Pending High-Risk Approvals" value={stats.pendingHighRiskApprovals} icon={ShieldCheck} tone="amber" />
        <StatCard label="Orders to Fulfill" value={stats.ordersToFulfill} icon={Truck} tone="blue" />
        <StatCard label="Pending Invoices" value={stats.pendingInvoices} icon={FileText} tone="purple" />
        <StatCard label="Total Revenue" value={`$${stats.totalRevenue.toLocaleString()}`} icon={CreditCard} tone="green" />
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Backorders" value={stats.backorders} icon={AlertTriangle} tone="rose" />
        <StatCard label="Warehouse Utilization" value={`${stats.warehouseUtilization}%`} icon={Boxes} tone="blue" />
        <StatCard label="Approved" value={approvalOverview.approved} icon={CheckCircle2} tone="green" />
        <StatCard label="Rejected" value={approvalOverview.rejected} icon={AlertTriangle} tone="rose" />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Fulfillment Overview */}
        <Card title="Fulfillment Overview" className="lg:col-span-1">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Pending</span>
              <span className="font-medium text-amber-600">{fulfillmentOverview.pending}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Allocated</span>
              <span className="font-medium text-blue-600">{fulfillmentOverview.allocated}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Fulfilled</span>
              <span className="font-medium text-emerald-600">{fulfillmentOverview.fulfilled}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Backordered</span>
              <span className="font-medium text-rose-600">{fulfillmentOverview.backordered}</span>
            </div>
          </div>
        </Card>

        {/* Billing Overview */}
        <Card title="Billing Overview" className="lg:col-span-1">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Pending Invoices</span>
              <span className="font-medium text-amber-600">{billingOverview.pendingInvoices}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Paid Invoices</span>
              <span className="font-medium text-emerald-600">{billingOverview.paidInvoices}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Overdue</span>
              <span className="font-medium text-rose-600">{billingOverview.overdueInvoices}</span>
            </div>
            <div className="flex justify-between text-sm border-t border-blue-100 pt-2">
              <span className="text-slate-600 font-medium">Total Outstanding</span>
              <span className="font-semibold text-slate-800">${billingOverview.totalOutstanding.toLocaleString()}</span>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card title="Quick Actions">
          <div className="space-y-2">
            <button onClick={() => navigate("/finance/fulfillment")} className="flex w-full items-center gap-2 rounded-lg border border-blue-100 p-3 text-left hover:bg-blue-50/40 transition-colors">
              <Truck className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-slate-700">Review Fulfillment</span>
            </button>
            <button onClick={() => navigate("/finance/invoices")} className="flex w-full items-center gap-2 rounded-lg border border-blue-100 p-3 text-left hover:bg-blue-50/40 transition-colors">
              <FileText className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium text-slate-700">View Invoices</span>
            </button>
            <button onClick={() => navigate("/finance/approvals")} className="flex w-full items-center gap-2 rounded-lg border border-blue-100 p-3 text-left hover:bg-blue-50/40 transition-colors">
              <ShieldCheck className="h-4 w-4 text-amber-600" />
              <span className="text-sm font-medium text-slate-700">High-Risk Approvals</span>
            </button>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card title="Recent Activity" className="mt-5">
        <div className="space-y-2 text-sm">
          {recentActivity.map((item, idx) => (
            <div key={idx} className="flex justify-between border-b border-blue-50 pb-2 last:border-0">
              <span>
                <span className="font-medium">{item.user}</span> {item.action}{" "}
                <span className="text-blue-600">{item.entity}</span>
              </span>
              <span className="text-xs text-slate-400">{item.timestamp}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}