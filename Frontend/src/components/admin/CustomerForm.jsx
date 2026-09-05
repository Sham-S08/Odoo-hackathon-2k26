import { useState } from "react";
import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";

const TIER_OPTIONS = [
  { value: "Bronze", label: "Bronze (up to 5%)" },
  { value: "Silver", label: "Silver (up to 10%)" },
  { value: "Gold", label: "Gold (up to 15%)" },
];

export default function CustomerForm({ initialValue, onSubmit, onCancel, submitting }) {
  const [form, setForm] = useState(
    initialValue || { name: "", tier: "Silver", contactEmail: "", currency: "USD" }
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
        label="Customer name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <Select
        label="Pricing tier"
        options={TIER_OPTIONS}
        value={form.tier}
        onChange={(e) => setForm({ ...form, tier: e.target.value })}
      />
      <Input
        label="Contact email"
        type="email"
        value={form.contactEmail}
        onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
      />
      <Input
        label="Currency"
        value={form.currency}
        onChange={(e) => setForm({ ...form, currency: e.target.value })}
      />
      <div className="flex justify-end gap-2">
        <Button variant="secondary" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" loading={submitting}>
          Save customer
        </Button>
      </div>
    </form>
  );
}
