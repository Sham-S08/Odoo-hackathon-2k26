import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  TrendingUp,
  XCircle 
} from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import StatCard from "../../components/dashboard/StatCard";
import Card from "../../components/common/Card";
import ViewToggle from "../../components/manager/ViewToggle";

// Mock Data
const MOCK_APPROVAL_SUMMARY = {
  pendingManager: 4,
  pendingFinance: 2,
  approvedToday: 3,
  rejectedToday: 1,
};

const MOCK_RISK_DISTRIBUTION = [
  { level: "Low", count: 8, color: "emerald" },
  { level: "Medium", count: 5, color: "amber" },
  { level: "High", count: 3, color: "rose" },
  { level: "Critical", count: 2, color: "red" },
];

const MOCK_ALERTS = [
  { 
    id: 1, 
    type: "discount_anomaly", 
    title: "High discount anomaly detected",
    description: "Priya Shah gave 18% discount vs 9% average",
    quotationId: "quo_5001",
    severity: "high"
  },
  { 
    id: 2, 
    type: "stalled", 
    title: "Quotation stalled for 8 days",
    description: "Acme Corp - $24,800 quote inactive",
    quotationId: "quo_5004",
    severity: "medium"
  },
  { 
    id: 3, 
    type: "risk", 
    title: "Blended risk score exceeded threshold",
    description: "Beta Industries - Risk score 72/100",
    quotationId: "quo_5002",
    severity: "critical"
  },
];

export default function ManagerDashboard() {
  const navigate = useNavigate();
  const [view, setView] = useState("cards");

  return (
    <div>
      <PageHeader 
        title="Manager Dashboard" 
        description="Decision-focused overview of approvals, risk, and deal health" 
      />

      {/* KPI Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard 
          label="Pending Approvals" 
          value={MOCK_APPROVAL_SUMMARY.pendingManager} 
          icon={ShieldCheck} 
          tone="amber"
          change={2}
        />
        <StatCard 
          label="High-Risk Deals" 
          value="3" 
          icon={AlertTriangle} 
          tone="rose"
        />
        <StatCard 
          label="Critical Deals" 
          value="2" 
          icon={AlertTriangle} 
          tone="red"
        />
        <StatCard 
          label="Stalled Quotations" 
          value="5" 
          icon={Clock} 
          tone="amber"
        />
        <StatCard 
          label="Negotiations Awaiting" 
          value="3" 
          icon={TrendingUp} 
          tone="blue"
        />
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          label="Approved Today" 
          value={MOCK_APPROVAL_SUMMARY.approvedToday} 
          icon={CheckCircle2} 
          tone="green"
        />
        <StatCard 
          label="Rejected Today" 
          value={MOCK_APPROVAL_SUMMARY.rejectedToday} 
          icon={XCircle} 
          tone="rose"
        />
        <StatCard 
          label="Manager Approval" 
          value="4" 
          icon={ShieldCheck} 
          tone="amber"
        />
        <StatCard 
          label="Finance Approval" 
          value="2" 
          icon={ShieldCheck} 
          tone="purple"
        />
      </div>

      {/* Deal Health Overview & Alerts */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card title="Risk Distribution" className="lg:col-span-1">
          <div className="space-y-3">
            {MOCK_RISK_DISTRIBUTION.map((item) => (
              <div key={item.level} className="flex items-center justify-between">
                <span className="text-sm text-slate-600">{item.level}</span>
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-24 rounded-full bg-${item.color}-100`}>
                    <div 
                      className={`h-2 rounded-full bg-${item.color}-500`} 
                      style={{ width: `${(item.count / 18) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-slate-700">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Deal Health Alerts" className="lg:col-span-2">
          <div className="space-y-2">
            {MOCK_ALERTS.map((alert) => (
              <button
                key={alert.id}
                onClick={() => navigate(`/manager/approvals/${alert.quotationId}`)}
                className="flex w-full items-center gap-3 rounded-lg border border-amber-100 bg-amber-50/60 p-3 text-left hover:bg-amber-50"
              >
                <AlertTriangle className={`h-4 w-4 shrink-0 ${
                  alert.severity === "critical" ? "text-red-500" : 
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