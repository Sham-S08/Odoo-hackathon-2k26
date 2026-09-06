import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/layout/PageHeader";
import Table from "../../components/common/Table";
import Badge from "../../components/common/Badge";
import { formatCurrency } from "../../utils/formatCurrency";
import { useApprovals } from "../../hooks/useApprovals";

export default function Approvals() {
  const navigate = useNavigate();
  const { approvals, loading, error } = useApprovals();
  const rows = approvals.map((quotation) => ({ ...quotation, customerName: quotation.customer?.name || "Unknown customer", total: Number(quotation.total || 0), risk: quotation.dealHealth?.[0] }));
  const columns = [{ key: "id", header: "Quotation" }, { key: "customerName", header: "Customer" }, { key: "total", header: "Total", render: (row) => formatCurrency(row.total) }, { key: "risk", header: "AI Risk", render: (row) => <Badge tone={row.risk?.riskLevel === "CRITICAL" ? "red" : "rose"}>{row.risk?.riskLevel || "Pending"} · {row.risk?.riskScore || 0}/100</Badge> }];
  return (
    <div>
      <PageHeader
        title="High-Risk Approvals"
        description="Quotations requiring Finance Manager review"
      />
      {error ? <p className="mb-4 rounded-lg bg-rose-50 p-4 text-sm text-rose-700">{error}</p> : null}
      <Table columns={columns} data={rows} loading={loading} emptyMessage="No high-risk approvals pending" onRowClick={(row) => navigate(`/finance/approvals/${row.id}`)} />
    </div>
  );
}