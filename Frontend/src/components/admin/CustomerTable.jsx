import Table from "../common/Table";
import Badge from "../common/Badge";

const TIER_TONES = { 
  Bronze: "amber", 
  Silver: "slate", 
  Gold: "blue" 
};

export default function CustomerTable({ customers, loading, onEdit }) {
  const columns = [
    { key: "name", header: "Customer" },
    { key: "tier", header: "Tier", render: (r) => <Badge tone={TIER_TONES[r.tier] || "slate"}>{r.tier}</Badge> },
    { key: "contactEmail", header: "Contact Email" },
    { key: "currency", header: "Currency" },
    { 
      key: "status", 
      header: "Status", 
      render: (r) => <Badge tone={r.status === "Active" ? "green" : "slate"}>{r.status || "Active"}</Badge> 
    },
  ];
  
  return (
    <Table 
      columns={columns} 
      data={customers} 
      loading={loading} 
      emptyMessage="No customers found" 
      onRowClick={onEdit} 
    />
  );
}