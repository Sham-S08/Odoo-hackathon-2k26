import Table from "../common/Table";
import Badge from "../common/Badge";

const TIER_TONES = { Bronze: "amber", Silver: "slate", Gold: "royal" };

export default function CustomerTable({ customers, loading, onEdit }) {
  const columns = [
    { key: "name", header: "Customer" },
    { key: "tier", header: "Tier", render: (r) => <Badge tone={TIER_TONES[r.tier]}>{r.tier}</Badge> },
    { key: "contactEmail", header: "Contact" },
    { key: "currency", header: "Currency" },
  ];
  return (
    <Table columns={columns} data={customers} loading={loading} emptyMessage="No customers yet" onRowClick={onEdit} />
  );
}
