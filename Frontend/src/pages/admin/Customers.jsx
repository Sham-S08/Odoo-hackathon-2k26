import { useState } from "react";
import { Plus } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import CustomerTable from "../../components/admin/CustomerTable";
import CustomerForm from "../../components/admin/CustomerForm";
import { SAMPLE_CUSTOMERS } from "../../utils/sampleData";

export default function Customers() {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  return (
    <div>
      <PageHeader
        title="Customers"
        description="Manage accounts, pricing tiers, and contacts"
        actions={
          <Button variant="gradient" icon={Plus} onClick={() => { setEditing(null); setOpen(true); }}>
            New Customer
          </Button>
        }
      />
      <CustomerTable customers={SAMPLE_CUSTOMERS} onEdit={(c) => { setEditing(c); setOpen(true); }} />

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? "Edit customer" : "New customer"}>
        <CustomerForm initialValue={editing} onSubmit={() => setOpen(false)} onCancel={() => setOpen(false)} />
      </Modal>
    </div>
  );
}
