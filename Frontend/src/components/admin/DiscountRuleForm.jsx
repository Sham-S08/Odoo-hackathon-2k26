import { useState } from "react";
import Select from "../common/Select";
import Input from "../common/Input";
import Button from "../common/Button";

const TIER_OPTIONS = ["Bronze", "Silver", "Gold"].map((v) => ({ value: v, label: v }));
const CATEGORY_OPTIONS = ["Hardware", "Services", "Subscriptions"].map((v) => ({ value: v, label: v }));
const CHAIN_OPTIONS = [
  { value: "Sales Manager", label: "Sales Manager only" },
  { value: "Finance", label: "Sales Manager + Finance" },
];

export default function DiscountRuleForm({ initialValue, onSubmit, onCancel, submitting }) {
  const [form, setForm] = useState(
    initialValue || { tier: "Gold", category: "Hardware", ceiling: 15, approvalChain: "Sales Manager" }
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
      className="space-y-4"
    >
      <Select
        label="Customer tier"
        options={TIER_OPTIONS}
        value={form.tier}
        onChange={(e) => setForm({ ...form, tier: e.target.value })}
      />
      <Select
        label="Product category"
        options={CATEGORY_OPTIONS}
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />
      <Input
        label="Discount ceiling %"
        type="number"
        value={form.ceiling}
        onChange={(e) => setForm({ ...form, ceiling: e.target.value })}
      />
      <Select
        label="Escalates to"
        options={CHAIN_OPTIONS}
        value={form.approvalChain}
        onChange={(e) => setForm({ ...form, approvalChain: e.target.value })}
      />
      <div className="flex justify-end gap-2">
        <Button variant="secondary" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" loading={submitting}>
          Save rule
        </Button>
      </div>
    </form>
  );
}
