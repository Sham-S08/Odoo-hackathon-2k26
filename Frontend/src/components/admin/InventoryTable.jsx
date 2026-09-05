import Table from "../common/Table";
import Badge from "../common/Badge";

export default function InventoryTable({ inventory, loading, onEdit }) {
  const columns = [
    { key: "productName", header: "Product" },
    { key: "warehouseName", header: "Warehouse" },
    { key: "quantity", header: "Available Stock" },
    { 
      key: "status", 
      header: "Status", 
      render: (r) => {
        const qty = r.quantity || 0;
        const tone = qty === 0 ? "rose" : qty < 10 ? "amber" : "green";
        const label = qty === 0 ? "Out of Stock" : qty < 10 ? "Low Stock" : "In Stock";
        return <Badge tone={tone}>{label}</Badge>;
      }
    },
    { key: "updatedAt", header: "Last Updated" },
  ];
  
  return (
    <Table 
      columns={columns} 
      data={inventory} 
      loading={loading} 
      emptyMessage="No inventory records found" 
      onRowClick={onEdit} 
    />
  );
}