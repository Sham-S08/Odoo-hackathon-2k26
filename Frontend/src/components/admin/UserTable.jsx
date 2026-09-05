import Table from "../common/Table";
import Badge from "../common/Badge";

const ROLE_BADGES = {
  admin: { tone: "purple", label: "Admin" },
  sales: { tone: "blue", label: "Sales Rep" },
  manager: { tone: "amber", label: "Manager" },
  finance: { tone: "rose", label: "Finance" },
  customer: { tone: "slate", label: "Customer" },
};

export default function UserTable({ users, loading, onEdit }) {
  const columns = [
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { 
      key: "role", 
      header: "Role", 
      render: (r) => {
        const badge = ROLE_BADGES[r.role] || ROLE_BADGES.sales;
        return <Badge tone={badge.tone}>{badge.label}</Badge>;
      }
    },
    {
      key: "status",
      header: "Status",
      render: (r) => <Badge tone={r.status === "Active" ? "green" : "slate"}>{r.status}</Badge>,
    },
    { key: "createdAt", header: "Created At" },
  ];
  
  return (
    <Table 
      columns={columns} 
      data={users} 
      loading={loading} 
      emptyMessage="No users found" 
      onRowClick={onEdit} 
    />
  );
}