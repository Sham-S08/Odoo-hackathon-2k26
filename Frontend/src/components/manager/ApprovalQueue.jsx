import Table from "../common/Table";
import Badge from "../common/Badge";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";

const RISK_TONES = {
  LOW: "green",
  MEDIUM: "amber",
  HIGH: "rose",
  CRITICAL: "red",
};

const STATUS_TONES = {
  Pending: "amber",
  Approved: "green",
  Rejected: "rose",
  "Returned for Revision": "blue",
};

export default function ApprovalQueue({ approvals, loading, onOpen }) {
  const columns = [
    { key: "id", header: "Quotation" },
    { key: "customerName", header: "Customer" },
    { key: "rep", header: "Sales Rep" },
    { 
      key: "total", 
      header: "Total Amount", 
      render: (r) => formatCurrency(r.total) 
    },
    { 
      key: "discount", 
      header: "Discount", 
      render: (r) => `${r.discount}%` 
    },
    { 
      key: "riskScore", 
      header: "Risk Score", 
      render: (r) => (
        <span className={`font-medium ${
          r.riskScore >= 80 ? "text-red-600" :
          r.riskScore >= 60 ? "text-rose-600" :
          r.riskScore >= 40 ? "text-amber-600" : "text-emerald-600"
        }`}>
          {r.riskScore}/100
        </span>
      )
    },
    { 
      key: "riskLevel", 
      header: "Risk Level", 
      render: (r) => <Badge tone={RISK_TONES[r.riskLevel] || "slate"}>{r.riskLevel}</Badge>
    },
    { 
      key: "status", 
      header: "Status", 
      render: (r) => <Badge tone={STATUS_TONES[r.status] || "slate"}>{r.status}</Badge>
    },
    { 
      key: "submittedAt", 
      header: "Submitted", 
      render: (r) => formatDate(r.submittedAt) 
    },
  ];

  return (
    <Table 
      columns={columns} 
      data={approvals} 
      loading={loading} 
      emptyMessage="No quotations currently require your approval." 
      onRowClick={onOpen} 
    />
  );
}