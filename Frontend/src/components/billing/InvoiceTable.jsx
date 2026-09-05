import Table from "../common/Table";
import PaymentStatus from "./PaymentStatus";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";

export default function InvoiceTable({ invoices, loading, onOpen }) {
  const columns = [
    { key: "id", header: "Invoice" },
    { key: "orderId", header: "Order" },
    { key: "amount", header: "Amount", render: (r) => formatCurrency(r.amount) },
    { key: "dueDate", header: "Due", render: (r) => formatDate(r.dueDate) },
    { key: "status", header: "Status", render: (r) => <PaymentStatus status={r.status} /> },
  ];

  return (
    <Table
      columns={columns}
      data={invoices}
      loading={loading}
      emptyMessage="No invoices yet"
      onRowClick={onOpen}
    />
  );
}
