import { useState } from "react";
import { Plus } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import WarehouseTable from "../../components/admin/WarehouseTable";
import WarehouseForm from "../../components/admin/WarehouseForm";
import { SAMPLE_WAREHOUSES } from "../../utils/sampleData";

export default function Warehouses() {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  return (
    <div>
      <PageHeader
        title="Warehouses"
        description="Manage locations, stock levels, and shipping cost weighting"
        actions={
          <Button variant="gradient" icon={Plus} onClick={() => { setEditing(null); setOpen(true); }}>
            New Warehouse
          </Button>
        }
      />
      <WarehouseTable warehouses={SAMPLE_WAREHOUSES} onEdit={(w) => { setEditing(w); setOpen(true); }} />

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? "Edit warehouse" : "New warehouse"}>
        <WarehouseForm initialValue={editing} onSubmit={() => setOpen(false)} onCancel={() => setOpen(false)} />
      </Modal>
    </div>
  );
}
