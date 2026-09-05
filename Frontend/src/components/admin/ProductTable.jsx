import Table from "../common/Table";
import Badge from "../common/Badge";
import { formatCurrency } from "../../utils/formatCurrency";

export default function ProductTable({ products, loading, onEdit }) {
  const columns = [
    { key: "name", header: "Product" },
    { key: "category", header: "Category", render: (r) => <Badge tone="slate">{r.category}</Badge> },
    { key: "price", header: "Price", render: (r) => formatCurrency(r.price) },
    { key: "unit", header: "Unit" },
    { key: "tax", header: "Tax", render: (r) => `${r.tax}%` },
  ];
  return (
    <Table columns={columns} data={products} loading={loading} emptyMessage="No products yet" onRowClick={onEdit} />
  );
}
