import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/layout/PageHeader";
import Input from "../../components/common/Input";
import ViewToggle from "../../components/manager/ViewToggle";
import DealHealthCard from "../../components/manager/DealHealthCard";
import { useQuotations } from "../../hooks/useQuotations";

function mapDeal(quotation) {
  const health = quotation.dealHealth?.[0] || {};
  return { ...quotation, customerName: quotation.customer?.name || "Unknown customer", rep: quotation.createdBy?.name || "Sales representative", total: Number(quotation.total || 0), riskScore: health.riskScore || 0, riskLevel: health.riskLevel || "LOW", idleDays: Math.max(0, Math.floor((Date.now() - new Date(quotation.updatedAt).getTime()) / 86400000)), stage: quotation.status.replaceAll("_", " ") };
}

export default function DealHealth() {
  const navigate = useNavigate();
  const [view, setView] = useState("cards");
  const [query, setQuery] = useState("");
  const { quotations, loading, error } = useQuotations();
  const deals = useMemo(() => quotations.map(mapDeal).filter((deal) => `${deal.id} ${deal.customerName}`.toLowerCase().includes(query.toLowerCase())), [quotations, query]);
  return <div>
    <PageHeader title="Deal Health" description="AI-generated risk results for every quotation" actions={<ViewToggle view={view} onViewChange={setView} />} />
    <div className="mb-4 max-w-sm"><Input placeholder="Search customer or quotation" icon={Search} value={query} onChange={(event) => setQuery(event.target.value)} /></div>
    {error ? <p className="mb-4 rounded-lg bg-rose-50 p-4 text-sm text-rose-700">{error}</p> : null}
    {loading ? <p className="text-sm text-slate-500">Loading deal health...</p> : view === "cards" ? <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">{deals.map((deal) => <DealHealthCard key={deal.id} deal={deal} onOpen={() => navigate(`/manager/approvals/${deal.id}`)} />)}</div> : <div className="overflow-x-auto rounded-xl border border-blue-100 bg-white"><table className="w-full text-left text-sm"><thead><tr className="border-b border-blue-100 bg-blue-50/40"><th className="px-4 py-3">Quotation</th><th className="px-4 py-3">Customer</th><th className="px-4 py-3">Risk</th><th className="px-4 py-3">Score</th><th className="px-4 py-3">Action</th></tr></thead><tbody>{deals.map((deal) => <tr key={deal.id} className="border-b border-blue-50"><td className="px-4 py-3">{deal.id}</td><td className="px-4 py-3">{deal.customerName}</td><td className="px-4 py-3">{deal.riskLevel}</td><td className="px-4 py-3">{deal.riskScore}/100</td><td className="px-4 py-3"><button className="text-blue-600" onClick={() => navigate(`/manager/approvals/${deal.id}`)}>Review</button></td></tr>)}</tbody></table></div>}
  </div>;
}
