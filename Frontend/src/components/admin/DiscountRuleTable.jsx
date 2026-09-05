import Table from "../common/Table";
import Badge from "../common/Badge";

export default function DiscountRuleTable({ rules, loading, onEdit }) {
  const columns = [
    { key: "tier", header: "Customer Tier", render: (r) => <Badge tone="blue">{r.tier}</Badge> },
    { key: "category", header: "Category", render: (r) => <Badge tone="slate">{r.category}</Badge> },
    { key: "ceiling", header: "Max Discount", render: (r) => <span className="font-medium">{r.ceiling}%</span> },
    {
      key: "approvalChain",
      header: "Approval Level",
      render: (r) => <Badge tone={r.approvalChain === "Finance" ? "rose" : "amber"}>{r.approvalChain}</Badge>,
    },
  ];
  
  return (
    <Table 
      columns={columns} 
      data={rules} 
      loading={loading} 
      emptyMessage="No discount rules configured" 
      onRowClick={onEdit} 
    />
  );
}