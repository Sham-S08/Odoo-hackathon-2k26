import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import Input from "../../components/common/Input";
import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import { useQuotations } from "../../hooks/useQuotations";
import { displayStatus } from "../../utils/customerStatus";
const tones = { "Awaiting Confirmation": "purple", Confirmed: "green", "Under Negotiation": "amber", "Under Review": "amber", Rejected: "rose" };

export default function CustomerQuotations() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const { quotations, loading, error } = useQuotations();
  const rows = useMemo(() => quotations.filter((q) => q.id.toLowerCase().includes(query.toLowerCase())), [quotations, query]);
  return <div><PageHeader title="My Quotations" description="Quotations available for your review" /><div className="mb-4 max-w-sm"><Input placeholder="Search quotation ID" icon={Search} value={query} onChange={(event) => setQuery(event.target.value)} /></div>{error ? <p className="mb-4 rounded-lg bg-rose-50 p-4 text-sm text-rose-700">{error}</p> : null}<Card padded={false}>{loading ? <p className="p-5 text-sm text-slate-500">Loading quotations...</p> : <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead><tr className="border-b border-blue-100 bg-blue-50/40"><th className="px-4 py-3">Quotation</th><th className="px-4 py-3 text-right">Amount</th><th className="px-4 py-3 text-center">Status</th><th className="px-4 py-3 text-center">Version</th><th className="px-4 py-3 text-center">Action</th></tr></thead><tbody>{rows.map((q) => { const status = displayStatus(q.status); return <tr key={q.id} className="border-b border-blue-50"><td className="px-4 py-3 font-medium">{q.id}</td><td className="px-4 py-3 text-right">{Number(q.total || 0).toLocaleString()}</td><td className="px-4 py-3 text-center"><Badge tone={tones[status] || "slate"}>{status}</Badge></td><td className="px-4 py-3 text-center">v{q.versionNumber}</td><td className="px-4 py-3 text-center"><button onClick={() => navigate(`/portal/quotations/${q.id}`)} className="font-medium text-blue-600 hover:underline">Review</button></td></tr>; })}</tbody></table></div>}</Card></div>;
}
