import Table from "../common/Table";
import Badge from "../common/Badge";

export default function InventoryTable({ inventory, loading, onEdit }) {
  const columns = [
    { key: "productName", header: "Product" },
    { key: "warehouseName", header: "Warehouse" },
    { key: "quantity", header: "On hand" },
    {
      key: "status",
      header: "Status",
      render: (r) => (
        <Badge tone={r.quantity === 0 ? "rose" : r.quantity < 10 ? "amber" : "green"}>
          {r.quantity === 0 ? "Out of stock" : r.quantity < 10 ? "Low stock" : "In stock"}
        </Badge>
      ),
    },
  ];
  return (
    <Table columns={columns} data={inventory} loading={loading} emptyMessage="No inventory records" onRowClick={onEdit} />
  );
}
