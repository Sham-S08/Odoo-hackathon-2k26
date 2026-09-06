import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import Input from "../../components/common/Input";
import Table from "../../components/common/Table";
import Badge from "../../components/common/Badge";
import { formatCurrency } from "../../utils/formatCurrency";
import { useQuotations } from "../../hooks/useQuotations";

export default function Negotiations() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const { quotations, loading, error } = useQuotations();
  const rows = useMemo(() => quotations.filter((quotation) => ["CUSTOMER_REVIEW", "NEGOTIATION"].includes(quotation.status)).filter((quotation) => `${quotation.id} ${quotation.customer?.name || ""}`.toLowerCase().includes(query.toLowerCase())).map((quotation) => ({ ...quotation, customerName: quotation.customer?.name || "Unknown customer", stage: quotation.status.replaceAll("_", " "), total: Number(quotation.total || 0), latestMessage: quotation.negotiations?.at?.(-1)?.message || "Customer negotiation pending" })), [quotations, query]);
  const columns = [{ key: "id", header: "Quotation" }, { key: "customerName", header: "Customer" }, { key: "total", header: "Total", render: (row) => formatCurrency(row.total) }, { key: "stage", header: "Stage", render: (row) => <Badge tone="plum">{row.stage}</Badge> }, { key: "latestMessage", header: "Latest request" }];
  return <div><PageHeader title="Negotiations" description="Customer quotation changes awaiting manager review" /><div className="mb-4 max-w-sm"><Input placeholder="Search quotation or customer" icon={Search} value={query} onChange={(event) => setQuery(event.target.value)} /></div>{error ? <p className="mb-4 rounded-lg bg-rose-50 p-4 text-sm text-rose-700">{error}</p> : null}<Table columns={columns} data={rows} loading={loading} emptyMessage="No customer negotiations found" onRowClick={(quotation) => navigate(`/manager/approvals/${quotation.id}`)} /></div>;
}
