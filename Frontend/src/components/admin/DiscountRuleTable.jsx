import Table from "../common/Table";
import Badge from "../common/Badge";

export default function DiscountRuleTable({ rules, loading, onEdit }) {
  const columns = [
    { key: "tier", header: "Tier" },
    { key: "category", header: "Category" },
    { key: "ceiling", header: "Ceiling", render: (r) => `${r.ceiling}%` },
    {
      key: "approvalChain",
      header: "Approval chain",
      render: (r) => <Badge tone={r.approvalChain === "Finance" ? "plum" : "amber"}>{r.approvalChain}</Badge>,
    },
  ];
  return (
    <Table columns={columns} data={rules} loading={loading} emptyMessage="No discount rules configured" onRowClick={onEdit} />
  );
}
