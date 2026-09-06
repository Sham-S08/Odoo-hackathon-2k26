import { Boxes, ShieldCheck, Users, Warehouse, AlertTriangle, ShoppingBag, FileText, CreditCard } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import StatCard from "../../components/dashboard/StatCard";
import Card from "../../components/common/Card";
import { MOCK_DASHBOARD } from "../../utils/adminMockData";

export default function AdminDashboard() {
  const { stats, approvalOverview, inventoryOverview, salesOverview, dealHealth, recentActivity } = MOCK_DASHBOARD;

  return (
    <div>
      <PageHeader 
        title="Admin Dashboard" 
        description="Company-wide configuration, governance rules, and operational overview" 
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Products" value={stats.totalProducts} icon={Boxes} tone="blue" />
        <StatCard label="Total Customers" value={stats.totalCustomers} icon={Users} tone="slate" />
        <StatCard label="Active Users" value={stats.activeUsers} icon={Users} tone="green" />
        <StatCard label="Pending Approvals" value={stats.pendingApprovals} icon={ShieldCheck} tone="amber" />
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Low Stock Products" value={stats.lowStockProducts} icon={AlertTriangle} tone="amber" />
        <StatCard label="Active Subscription Plans" value={stats.activeSubscriptionPlans} icon={CreditCard} tone="blue" />
        <StatCard label="At-Risk Deals" value={stats.atRiskDeals} icon={AlertTriangle} tone="rose" />
        <StatCard label="Open Negotiations" value={stats.openNegotiations} icon={ShoppingBag} tone="purple" />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card title="Approval Overview" className="lg:col-span-2">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-lg bg-blue-50/60 p-4 text-center">
              <p className="text-2xl font-semibold text-blue-600">{approvalOverview.pendingManager}</p>
              <p className="text-xs text-slate-500">Pending Manager</p>
            </div>
            <div className="rounded-lg bg-purple-50/60 p-4 text-center">
              <p className="text-2xl font-semibold text-purple-600">{approvalOverview.pendingFinance}</p>
              <p className="text-xs text-slate-500">Pending Finance</p>
            </div>
            <div className="rounded-lg bg-emerald-50/60 p-4 text-center">
              <p className="text-2xl font-semibold text-emerald-600">{approvalOverview.approved}</p>
              <p className="text-xs text-slate-500">Approved</p>
            </div>
            <div className="rounded-lg bg-rose-50/60 p-4 text-center">
              <p className="text-2xl font-semibold text-rose-600">{approvalOverview.rejected}</p>
              <p className="text-xs text-slate-500">Rejected</p>
            </div>
          </div>
        </Card>

        <Card title="Deal Health">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Low Risk</span>
              <span className="font-medium text-emerald-600">{dealHealth.low}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Medium Risk</span>
              <span className="font-medium text-amber-600">{dealHealth.medium}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">High Risk</span>
              <span className="font-medium text-rose-600">{dealHealth.high}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Critical Risk</span>
              <span className="font-medium text-rose-700">{dealHealth.critical}</span>
            </div>
          </div>
        </Card>
      </div>

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