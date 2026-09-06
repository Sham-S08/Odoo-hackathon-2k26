import { AlertTriangle, CheckCircle2, Clock, ShieldCheck, TrendingUp, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/layout/PageHeader";
import StatCard from "../../components/dashboard/StatCard";
import Card from "../../components/common/Card";
import { useApprovals } from "../../hooks/useApprovals";
import { useQuotations } from "../../hooks/useQuotations";

export default function ManagerDashboard() {
  const navigate = useNavigate();
  const { approvals } = useApprovals();
  const { quotations } = useQuotations();
  const health = quotations.flatMap((quotation) => quotation.dealHealth || []);
  const negotiations = quotations.filter((quotation) => ["CUSTOMER_REVIEW", "NEGOTIATION"].includes(quotation.status));
  const highRisk = health.filter((item) => item.riskLevel === "HIGH").length;
  const criticalRisk = health.filter((item) => item.riskLevel === "CRITICAL").length;
  const stalled = quotations.filter((quotation) => Date.now() - new Date(quotation.updatedAt).getTime() > 5 * 86400000).length;
  const riskLevels = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];
  const alerts = quotations.filter((quotation) => (quotation.dealHealth?.[0]?.riskScore || 0) >= 60).slice(0, 5);

  return <div>
    <PageHeader title="Manager Dashboard" description="Live approvals, negotiations, and AI deal-health overview" />
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <StatCard label="Pending Approvals" value={approvals.length} icon={ShieldCheck} tone="amber" />
      <StatCard label="High-Risk Deals" value={highRisk} icon={AlertTriangle} tone="rose" />
      <StatCard label="Critical Deals" value={criticalRisk} icon={AlertTriangle} tone="red" />
      <StatCard label="Stalled Quotations" value={stalled} icon={Clock} tone="amber" />
      <StatCard label="Negotiations" value={negotiations.length} icon={TrendingUp} tone="blue" />
    </div>
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
      <StatCard label="Approved Quotations" value={quotations.filter((q) => q.status === "APPROVED").length} icon={CheckCircle2} tone="green" />
      <StatCard label="Rejected Quotations" value={quotations.filter((q) => q.status === "REJECTED").length} icon={XCircle} tone="rose" />
      <StatCard label="Total Quotations" value={quotations.length} icon={ShieldCheck} tone="purple" />
    </div>
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <Card title="AI Risk Distribution"><div className="space-y-3">{riskLevels.map((level) => { const count = health.filter((item) => item.riskLevel === level).length; return <div key={level} className="flex items-center justify-between"><span className="text-sm text-slate-600">{level}</span><div className="flex items-center gap-2"><div className="h-2 w-32 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-blue-500" style={{ width: `${Math.min(100, count * 10)}%` }} /></div><span className="text-sm font-medium text-slate-700">{count}</span></div></div>; })}</div></Card>
      <Card title="High-risk deal alerts"><div className="space-y-2">{alerts.length ? alerts.map((quotation) => { const item = quotation.dealHealth?.[0]; return <button key={quotation.id} onClick={() => navigate(`/manager/approvals/${quotation.id}`)} className="flex w-full items-center gap-3 rounded-lg border border-rose-100 bg-rose-50/50 p-3 text-left hover:bg-rose-50"><AlertTriangle className="h-4 w-4 shrink-0 text-rose-500" /><div className="min-w-0 flex-1"><p className="text-sm font-medium text-slate-800">{quotation.customer?.name || "Quotation"}</p><p className="truncate text-xs text-slate-500">AI risk {item?.riskScore ?? 0}/100 · {item?.riskLevel || "Unknown"}</p></div><span className="text-xs text-blue-600">Review</span></button>; }) : <p className="text-sm text-slate-500">No high-risk quotations found.</p>}</div></Card>
    </div>
  </div>;
}
