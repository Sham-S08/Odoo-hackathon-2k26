import { useNavigate } from "react-router-dom";
import { CheckCircle2, Clock, FileText, MessageSquare } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import Card from "../../components/common/Card";
import StatCard from "../../components/dashboard/StatCard";
import { useQuotations } from "../../hooks/useQuotations";
import { displayStatus } from "../../utils/customerStatus";

export default function CustomerDashboard() {
  const navigate = useNavigate();
  const { quotations, loading, error } = useQuotations();
  const active = quotations.filter((q) => ["DRAFT", "PENDING_APPROVAL", "APPROVED"].includes(q.status)).length;
  const negotiation = quotations.filter((q) => ["CUSTOMER_REVIEW", "NEGOTIATION"].includes(q.status)).length;
  const awaiting = quotations.filter((q) => q.status === "APPROVED").length;
  const confirmed = quotations.filter((q) => q.status === "CUSTOMER_ACCEPTED").length;

  return <div>
    <PageHeader title="Customer Dashboard" description="Review and manage your quotations" />
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard label="Active" value={active} icon={FileText} tone="blue" />
      <StatCard label="Under Negotiation" value={negotiation} icon={MessageSquare} tone="amber" />
      <StatCard label="Awaiting Confirmation" value={awaiting} icon={Clock} tone="purple" />
      <StatCard label="Confirmed" value={confirmed} icon={CheckCircle2} tone="green" />
    </div>
    {error ? <p className="mb-4 rounded-lg bg-rose-50 p-4 text-sm text-rose-700">{error}</p> : null}
    <Card title="Recent Quotations" action={<button onClick={() => navigate("/portal/quotations")} className="text-sm text-blue-600 hover:underline">View all</button>}>
      {loading ? <p className="text-sm text-slate-500">Loading quotations...</p> : quotations.length === 0 ? <p className="text-sm text-slate-500">No quotations available.</p> : <div className="space-y-3">{quotations.slice(0, 5).map((quotation) => <button key={quotation.id} onClick={() => navigate(`/portal/quotations/${quotation.id}`)} className="flex w-full items-center justify-between rounded-xl border border-blue-100 p-4 text-left hover:bg-blue-50/40"><div><p className="font-medium text-slate-800">{quotation.id}</p><p className="text-sm text-slate-500">{Number(quotation.total || 0).toLocaleString()} · {quotation.items?.length || 0} items</p></div><div className="text-right"><span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">{displayStatus(quotation.status)}</span><p className="mt-1 text-xs text-slate-400">v{quotation.versionNumber}</p></div></button>)}</div>}
    </Card>
  </div>;
}
