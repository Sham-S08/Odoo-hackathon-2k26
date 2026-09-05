import Table from "../common/Table";
import Badge from "../common/Badge";

export default function UserTable({ users, loading, onEdit }) {
  const columns = [
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "role", header: "Role", render: (r) => <Badge tone="royal">{r.role}</Badge> },
    {
      key: "status",
      header: "Status",
      render: (r) => <Badge tone={r.status === "Active" ? "green" : "slate"}>{r.status}</Badge>,
    },
  ];
  return (
    <Table columns={columns} data={users} loading={loading} emptyMessage="No users yet" onRowClick={onEdit} />
  );
}
