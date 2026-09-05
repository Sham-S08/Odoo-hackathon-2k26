import Table from "../common/Table";

export default function WarehouseTable({ warehouses, loading, onEdit }) {
  const columns = [
    { key: "name", header: "Warehouse" },
    { key: "location", header: "Location" },
    { key: "stockLevel", header: "Stock level" },
    { key: "shippingWeight", header: "Shipping weight" },
  ];
  return (
    <Table columns={columns} data={warehouses} loading={loading} emptyMessage="No warehouses yet" onRowClick={onEdit} />
  );
}
