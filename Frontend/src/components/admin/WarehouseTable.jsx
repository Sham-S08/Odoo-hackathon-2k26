import Table from "../common/Table";
import Badge from "../common/Badge";

export default function WarehouseTable({ warehouses, loading, onEdit }) {
  const columns = [
    { key: "name", header: "Warehouse" },
    { key: "location", header: "Location" },
    { key: "stockLevel", header: "Stock Level" },
    { key: "shippingWeight", header: "Shipping Weight" },
    { 
      key: "status", 
      header: "Status", 
      render: (r) => <Badge tone={r.status === "Active" ? "green" : "slate"}>{r.status || "Active"}</Badge> 
    },
  ];
  
  return (
    <Table 
      columns={columns} 
      data={warehouses} 
      loading={loading} 
      emptyMessage="No warehouses found" 
      onRowClick={onEdit} 
    />
  );
}