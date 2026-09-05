import { useState } from "react";
import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";

const CADENCE_OPTIONS = [
  { value: "Monthly", label: "Monthly" },
  { value: "Quarterly", label: "Quarterly" },
  { value: "Yearly", label: "Yearly" },
];

export default function SubscriptionPlanForm({ initialValue, onSubmit, onCancel, submitting }) {
  const [form, setForm] = useState(
    initialValue || { name: "", cadence: "Monthly", price: "", prorationRule: "Daily proration", cancellationRule: "" }
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
        label="Plan name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <Select
        label="Billing cadence"
        options={CADENCE_OPTIONS}
        value={form.cadence}
        onChange={(e) => setForm({ ...form, cadence: e.target.value })}
      />
      <Input
        label="Price per cycle"
        type="number"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />
      <Input
        label="Proration rule"
        value={form.prorationRule}
        onChange={(e) => setForm({ ...form, prorationRule: e.target.value })}
      />
      <Input
        label="Cancellation / refund rule"
        value={form.cancellationRule}
        onChange={(e) => setForm({ ...form, cancellationRule: e.target.value })}
      />
      <div className="flex justify-end gap-2">
        <Button variant="secondary" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" loading={submitting}>
          Save plan
        </Button>
      </div>
    </form>
  );
}
