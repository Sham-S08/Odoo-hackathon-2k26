import { useState } from "react";
import PageHeader from "../../components/layout/PageHeader";
import Table from "../../components/common/Table";
import Button from "../../components/common/Button";
import Badge from "../../components/common/Badge";
import { useOrders } from "../../hooks/useOrders";
import { ordersApi } from "../../api/orders.api";
import { useNotification } from "../../context/NotificationContext";

export default function Fulfillment() {
  const { orders, loading, error, refresh } = useOrders();
  const { notify } = useNotification();
  const [processing, setProcessing] = useState(null);
  async function allocate(order) { setProcessing(order.id); try { await ordersApi.allocate(order.id); await refresh(); notify("Order inventory allocated", "success"); } catch (requestError) { notify(requestError.message || "Could not allocate order", "error"); } finally { setProcessing(null); } }
  const columns = [{ key: "id", header: "Order" }, { key: "status", header: "Status", render: (row) => <Badge tone={row.status === "ALLOCATED" ? "green" : "amber"}>{row.status}</Badge> }, { key: "total", header: "Total", render: (row) => `$${Number(row.total || 0).toFixed(2)}` }, { key: "items", header: "Items", render: (row) => row.items?.length || 0 }, { key: "action", header: "Action", render: (row) => row.status === "CREATED" ? <Button variant="primary" loading={processing === row.id} onClick={() => allocate(row)}>Allocate</Button> : <span className="text-sm text-slate-500">Allocated</span> }];
  return (
    <div>
      <PageHeader title="Fulfillment" description="Warehouse allocation and order fulfillment" />
      {error ? <p className="mb-4 rounded-lg bg-rose-50 p-4 text-sm text-rose-700">{error}</p> : null}
      <Table columns={columns} data={orders} loading={loading} emptyMessage="No orders ready for fulfillment" />
    </div>
  );
}