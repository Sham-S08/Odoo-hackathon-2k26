import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import Input from "../../components/common/Input";
import Select from "../../components/common/Select";
import ViewToggle from "../../components/manager/ViewToggle";
import ApprovalQueue from "../../components/manager/ApprovalQueue";
import ApprovalCard from "../../components/manager/ApprovalCard";
import { useApprovals } from "../../hooks/useApprovals";

const RISK_OPTIONS = [{ value: "all", label: "All Risk Levels" }, { value: "critical", label: "Critical" }, { value: "high", label: "High" }, { value: "medium", label: "Medium" }, { value: "low", label: "Low" }];

function mapApproval(quotation) {
  const health = quotation.dealHealth?.[0];
  const discounts = quotation.items?.map((item) => Number(item.discountPercent || 0)) || [];
  return { ...quotation, customerName: quotation.customer?.name || "Unknown customer", rep: quotation.createdBy?.name || "Sales representative", total: Number(quotation.total || 0), discount: discounts.length ? Math.max(...discounts) : 0, riskScore: health?.riskScore ?? 0, riskLevel: health?.riskLevel || "LOW", status: "Pending", submittedAt: quotation.updatedAt, items: quotation.items?.length || 0, category: quotation.items?.[0]?.product?.category || "-" };
}

export default function Approvals() {
  const navigate = useNavigate();
  const [view, setView] = useState("table");
  const [query, setQuery] = useState("");
  const [risk, setRisk] = useState("all");
  const { approvals, loading, error } = useApprovals();
  const rows = useMemo(() => approvals.map(mapApproval).filter((approval) => {
    const text = `${approval.id} ${approval.customerName} ${approval.rep}`.toLowerCase();
    return text.includes(query.toLowerCase()) && (risk === "all" || approval.riskLevel.toLowerCase() === risk);
  }), [approvals, query, risk]);

  return <div>
    <PageHeader title="Approval Queue" description={`${rows.length} live quotation${rows.length === 1 ? "" : "s"} awaiting your review`} actions={<ViewToggle view={view} onViewChange={setView} />} />
    <div className="mb-4 flex flex-wrap gap-3 rounded-xl border border-blue-100 bg-white p-4 shadow-sm"><div className="w-64"><Input placeholder="Search quotation, customer, or rep" icon={Search} value={query} onChange={(event) => setQuery(event.target.value)} /></div><div className="w-44"><Select label="Risk Level" options={RISK_OPTIONS} value={risk} onChange={(event) => setRisk(event.target.value)} /></div></div>
    {error ? <p className="mb-4 rounded-lg bg-rose-50 p-4 text-sm text-rose-700">{error}</p> : null}
    {view === "table" ? <ApprovalQueue approvals={rows} loading={loading} onOpen={(row) => navigate(`/manager/approvals/${row.id}`)} /> : <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">{rows.map((row) => <ApprovalCard key={row.id} approval={row} onOpen={() => navigate(`/manager/approvals/${row.id}`)} />)}</div>}
  </div>;
}
