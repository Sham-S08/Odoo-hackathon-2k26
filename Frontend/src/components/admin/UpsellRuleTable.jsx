import Table from "../common/Table";
import Badge from "../common/Badge";

export default function UpsellRuleTable({ rules, loading, onEdit }) {
  const columns = [
    { key: "baseProduct", header: "Base Product" },
    { key: "suggestedProduct", header: "Suggested Product" },
    { 
      key: "ruleType", 
      header: "Type", 
      render: (r) => (
        <Badge tone={r.ruleType === "Upsell" ? "blue" : "purple"}>
          {r.ruleType}
        </Badge>
      )
    },
    { 
      key: "promotion", 
      header: "Promotion", 
      render: (r) => r.promotion ? <Badge tone="amber">{r.promotion}</Badge> : <span className="text-slate-400">—</span>
    },
    { key: "minimumMargin", header: "Min Margin %", render: (r) => `${r.minimumMargin}%` },
    { key: "priority", header: "Priority" },
    { 
      key: "status", 
      header: "Status", 
      render: (r) => <Badge tone={r.status === "Active" ? "green" : "slate"}>{r.status}</Badge>
    },
  ];
  
  return (
    <Table 
      columns={columns} 
      data={rules} 
      loading={loading} 
      emptyMessage="No upsell rules configured" 
      onRowClick={onEdit} 
    />
  );
}