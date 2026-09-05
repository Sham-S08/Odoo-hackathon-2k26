import { useState } from "react";
import { Plus } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import SubscriptionPlanForm from "../../components/admin/SubscriptionPlanForm";
import Table from "../../components/common/Table";
import { formatCurrency } from "../../utils/formatCurrency";

const SAMPLE_PLANS = [
  { id: "plan_1", name: "24/7 Support Plan", cadence: "Monthly", price: 99, prorationRule: "Daily proration" },
  { id: "plan_2", name: "Analytics Add-on", cadence: "Yearly", price: 590, prorationRule: "Daily proration" },
];

export default function SubscriptionPlans() {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const columns = [
    { key: "name", header: "Plan" },
    { key: "cadence", header: "Cadence" },
    { key: "price", header: "Price / cycle", render: (r) => formatCurrency(r.price) },
    { key: "prorationRule", header: "Proration rule" },
  ];

  return (
    <div>
      <PageHeader
        title="Subscription plans"
        description="Recurring plans, proration, and cancellation rules"
        actions={
          <Button variant="gradient" icon={Plus} onClick={() => { setEditing(null); setOpen(true); }}>
            New Plan
          </Button>
        }
      />
      <Table columns={columns} data={SAMPLE_PLANS} onRowClick={(p) => { setEditing(p); setOpen(true); }} />

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? "Edit plan" : "New subscription plan"}>
        <SubscriptionPlanForm initialValue={editing} onSubmit={() => setOpen(false)} onCancel={() => setOpen(false)} />
      </Modal>
    </div>
  );
}
