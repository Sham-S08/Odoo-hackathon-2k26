import { useState } from "react";
import { Plus, Search } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import Input from "../../components/common/Input";
import SubscriptionPlanForm from "../../components/admin/SubscriptionPlanForm";
import Table from "../../components/common/Table";
import Badge from "../../components/common/Badge";
import { formatCurrency } from "../../utils/formatCurrency";
import { MOCK_SUBSCRIPTION_PLANS } from "../../utils/adminMockData";

export default function SubscriptionPlans() {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPlans = MOCK_SUBSCRIPTION_PLANS.filter((plan) =>
    plan.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    { key: "name", header: "Plan Name" },
    { key: "cadence", header: "Billing Frequency" },
    { key: "price", header: "Price / Cycle", render: (r) => formatCurrency(r.price) },
    { key: "prorationRule", header: "Proration Rule" },
    { 
      key: "status", 
      header: "Status", 
      render: (r) => <Badge tone={r.status === "Active" ? "green" : "slate"}>{r.status}</Badge> 
    },
  ];

  return (
    <div>
      <PageHeader
        title="Subscription Plans"
        description="Configure recurring billing plans, proration rules, and cancellation policies"
        actions={
          <Button variant="primary" icon={Plus} onClick={() => { setEditing(null); setOpen(true); }}>
            New Plan
          </Button>
        }
      />

      <div className="mb-4 max-w-sm">
        <Input
          placeholder="Search plans..."
          icon={Search}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="mb-4 rounded-xl border border-blue-100 bg-blue-50/40 p-3">
        <p className="text-sm text-slate-600">
          <span className="font-medium">Note:</span> Subscription products can be mixed with one-time products in the same order.
          Billing schedules are generated automatically based on these plans.
        </p>
      </div>

      <Table 
        columns={columns} 
        data={filteredPlans} 
        onRowClick={(p) => { setEditing(p); setOpen(true); }} 
      />

      <Modal 
        open={open} 
        onClose={() => setOpen(false)} 
        title={editing ? "Edit Subscription Plan" : "New Subscription Plan"}
        size="lg"
      >
        <SubscriptionPlanForm 
          initialValue={editing} 
          onSubmit={() => setOpen(false)} 
          onCancel={() => setOpen(false)} 
        />
      </Modal>
    </div>
  );
}