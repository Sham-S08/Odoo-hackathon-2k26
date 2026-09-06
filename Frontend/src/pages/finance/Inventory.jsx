import { useState } from "react";
import PageHeader from "../../components/layout/PageHeader";
import Table from "../../components/common/Table";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { useInventory } from "../../hooks/useInventory";
import { inventoryApi } from "../../api/inventory.api";
import { useNotification } from "../../context/NotificationContext";

export default function Inventory() {
  const { inventory, loading, error, refresh } = useInventory();
  const { notify } = useNotification();
  const [editing, setEditing] = useState(null);
  const rows = inventory.map((item) => ({ ...item, productName: item.product?.name || item.productId, warehouseName: item.warehouse?.name || item.warehouseId }));
  const save = async () => { try { await inventoryApi.update(editing.id, { quantity: Number(editing.quantity) }); setEditing(null); await refresh(); notify("Inventory updated", "success"); } catch (requestError) { notify(requestError.message || "Could not update inventory", "error"); } };
  const columns = [{ key: "productName", header: "Product" }, { key: "warehouseName", header: "Warehouse" }, { key: "quantity", header: "Quantity" }, { key: "updatedAt", header: "Updated" }, { key: "action", header: "Action", render: (row) => <Button variant="secondary" onClick={() => setEditing({ ...row })}>Edit</Button> }];
  return (
    <div>
      <PageHeader title="Inventory" description="Stock levels across all warehouses" />
      {error ? <p className="mb-4 rounded-lg bg-rose-50 p-4 text-sm text-rose-700">{error}</p> : null}
      <Table columns={columns} data={rows} loading={loading} emptyMessage="No inventory records found" />
      {editing ? <div className="mt-4 flex items-end gap-3 rounded-xl border border-blue-100 bg-white p-4"><Input label={`Quantity for ${editing.productName}`} type="number" min="0" value={editing.quantity} onChange={(event) => setEditing({ ...editing, quantity: event.target.value })} /><Button variant="primary" onClick={save}>Save quantity</Button><Button variant="secondary" onClick={() => setEditing(null)}>Cancel</Button></div> : null}
    </div>
  );
}