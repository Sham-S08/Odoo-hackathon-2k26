import { useState } from "react";
import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";

const CADENCE_OPTIONS = [
  { value: "Monthly", label: "Monthly" },
  { value: "Quarterly", label: "Quarterly" },
  { value: "Yearly", label: "Yearly" },
];

const STATUS_OPTIONS = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
];

export default function SubscriptionPlanForm({ initialValue, onSubmit, onCancel, submitting }) {
  const [form, setForm] = useState(
    initialValue || { 
      name: "", 
      cadence: "Monthly", 
      price: "", 
      prorationRule: "Daily proration",
      cancellationRule: "",
      status: "Active"
    }
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
      className="space-y-4"
    >
      <Input
        label="Plan Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      
      <Select
        label="Billing Cadence"
        options={CADENCE_OPTIONS}
        value={form.cadence}
        onChange={(e) => setForm({ ...form, cadence: e.target.value })}
      />
      
      <Input
        label="Price per Cycle"
        type="number"
        min={0}
        value={form.price}
        onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
        required
      />
      
      <Input
        label="Proration Rule"
        value={form.prorationRule}
        onChange={(e) => setForm({ ...form, prorationRule: e.target.value })}
        placeholder="e.g. Daily proration, No proration"
      />
      
      <Input
        label="Cancellation / Refund Rule"
        value={form.cancellationRule}
        onChange={(e) => setForm({ ...form, cancellationRule: e.target.value })}
        placeholder="e.g. Full refund within 30 days"
      />
      
      <Select
        label="Status"
        options={STATUS_OPTIONS}
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
      />

      <div className="rounded-lg bg-blue-50/60 p-3 text-xs text-slate-500">
        <span className="font-medium text-blue-600">Note:</span> Subscription products can be mixed with one-time products
        in the same order. Billing schedules auto-generate from this plan.
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="secondary" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" loading={submitting}>
          {initialValue ? "Update Plan" : "Create Plan"}
        </Button>
      </div>
    </form>
  );
}