import { useState } from "react";
import PageHeader from "../../components/layout/PageHeader";
import Table from "../../components/common/Table";
import Button from "../../components/common/Button";
import Badge from "../../components/common/Badge";
import { useInvoices } from "../../hooks/useInvoices";
import { useOrders } from "../../hooks/useOrders";
import { invoicesApi } from "../../api/invoices.api";
import { useNotification } from "../../context/NotificationContext";

export default function Invoices() {
  const { invoices, loading, error, refresh } = useInvoices();
  const { orders } = useOrders();
  const { notify } = useNotification();
  const [processing, setProcessing] = useState(null);
  const billableOrders = orders.filter((order) => !order.invoice && ["CREATED", "ALLOCATED", "FULFILLED", "COMPLETED"].includes(order.status));
  async function createInvoice(order) { setProcessing(order.id); try { await invoicesApi.createFromOrder(order.id); await refresh(); notify("Invoice created", "success"); } catch (requestError) { notify(requestError.message || "Could not create invoice", "error"); } finally { setProcessing(null); } }
  const columns = [{ key: "invoiceNumber", header: "Invoice" }, { key: "salesOrderId", header: "Order" }, { key: "total", header: "Total", render: (row) => `$${Number(row.total || 0).toFixed(2)}` }, { key: "status", header: "Status", render: (row) => <Badge tone={row.status === "PAID" ? "green" : "amber"}>{row.status}</Badge> }, { key: "createdAt", header: "Created", render: (row) => new Date(row.createdAt).toLocaleDateString() }];
  return (
    <div>
      <PageHeader title="Invoices" description="All invoices and payment status" />
      {error ? <p className="mb-4 rounded-lg bg-rose-50 p-4 text-sm text-rose-700">{error}</p> : null}
      {billableOrders.length ? <div className="mb-4 rounded-xl border border-blue-100 bg-white p-4"><p className="mb-3 text-sm font-medium text-slate-700">Orders without invoices</p><div className="flex flex-wrap gap-2">{billableOrders.map((order) => <Button key={order.id} variant="secondary" loading={processing === order.id} onClick={() => createInvoice(order)}>Invoice {order.id}</Button>)}</div></div> : null}
      <Table columns={columns} data={invoices} loading={loading} emptyMessage="No invoices found" />
    </div>
  );
}