import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, ShieldCheck, Users, TrendingUp, CheckCircle2, XCircle, Clock } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import StatCard from "../../components/dashboard/StatCard";
import Card from "../../components/common/Card";
import { MOCK_MANAGER_DASHBOARD } from "../../utils/managerMockData";

export default function ManagerDashboard() {
  const navigate = useNavigate();
  const { stats, approvalSummary, riskDistribution, alerts } = MOCK_MANAGER_DASHBOARD;

  return (
    <div>
      <PageHeader 
        title="Manager Dashboard" 
        description="Live approvals, negotiations, and AI deal-health overview" 
      />

      {/* KPI Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Pending Approvals" value={stats.pendingApprovals} icon={ShieldCheck} tone="amber" />
        <StatCard label="High-Risk Deals" value={stats.highRiskDeals} icon={AlertTriangle} tone="rose" />
        <StatCard label="Critical Deals" value={stats.criticalDeals} icon={AlertTriangle} tone="red" />
        <StatCard label="Negotiations" value={stats.negotiations} icon={Users} tone="purple" />
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Approved Quotations" value={approvalSummary.approvedToday} icon={CheckCircle2} tone="green" />
        <StatCard label="Rejected Quotations" value={approvalSummary.rejectedToday} icon={XCircle} tone="rose" />
        <StatCard label="Pending Manager" value={approvalSummary.pendingManager} icon={ShieldCheck} tone="amber" />
        <StatCard label="Pending Finance" value={approvalSummary.pendingFinance} icon={ShieldCheck} tone="purple" />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Risk Distribution */}
        <Card title="AI Risk Distribution">
          <div className="space-y-3">
            {riskDistribution.map((item) => (
              <div key={item.level} className="flex items-center justify-between">
                <span className="text-sm text-slate-600">{item.level}</span>
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-24 rounded-full bg-${item.color}-100`}>
                    <div 
                      className={`h-2 rounded-full bg-${item.color}-500`} 
                      style={{ width: `${(item.count / 6) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-slate-700">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Deal Health Alerts */}
        <Card title="High-risk deal alerts">
          <div className="space-y-2">
            {alerts.map((alert) => (
              <button
                key={alert.id}
                onClick={() => navigate(`/manager/approvals/${alert.quotationId}`)}
                className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left hover:bg-blue-50/40 transition-colors ${
                  alert.severity === "high" ? "border-rose-200 bg-rose-50/40" : "border-amber-100 bg-amber-50/40"
                }`}
              >
                <AlertTriangle className={`h-4 w-4 shrink-0 ${
                  alert.severity === "high" ? "text-rose-500" : "text-amber-500"
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800">{alert.title}</p>
                  <p className="text-xs text-slate-500 truncate">{alert.description}</p>
                </div>
                <span className="text-xs text-blue-600">View →</span>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}