import Table from "../common/Table";
import Badge from "../common/Badge";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";

const STAGE_TONES = {
  Draft: "slate",
  "Pending Approval": "amber",
  "Under Negotiation": "plum",
  Approved: "green",
  Rejected: "rose",
  Confirmed: "royal",
  Fulfilled: "green",
};

export default function QuotationTable({ quotations, loading, onOpen }) {
  const columns = [
    { key: "id", header: "Quote ID" },
    { key: "customerName", header: "Customer" },
    {
      key: "total",
      header: "Amount",
      render: (row) => formatCurrency(row.total),
    },
    {
      key: "stage",
      header: "Stage",
      render: (row) => <Badge tone={STAGE_TONES[row.stage] || "slate"}>{row.stage}</Badge>,
    },
    { key: "rep", header: "Rep" },
    {
      key: "updatedAt",
      header: "Last activity",
      render: (row) => formatDate(row.updatedAt),
    },
  ];

  return (
    <Table
      columns={columns}
      data={quotations}
      loading={loading}
      emptyMessage="No quotations yet"
      onRowClick={onOpen}
    />
  );
}
