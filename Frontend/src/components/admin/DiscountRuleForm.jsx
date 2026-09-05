import { useState } from "react";
import Select from "../common/Select";
import Input from "../common/Input";
import Button from "../common/Button";

const TIER_OPTIONS = ["Bronze", "Silver", "Gold"].map((v) => ({ value: v, label: v }));
const CATEGORY_OPTIONS = ["Hardware", "Services", "Subscriptions"].map((v) => ({ value: v, label: v }));
const CHAIN_OPTIONS = [
  { value: "None", label: "No Approval Required" },
  { value: "Sales Manager", label: "Sales Manager Only" },
  { value: "Finance", label: "Sales Manager + Finance" },
];

export default function DiscountRuleForm({ initialValue, onSubmit, onCancel, submitting }) {
  const [form, setForm] = useState(
    initialValue || { tier: "Gold", category: "Hardware", ceiling: 15, approvalChain: "Sales Manager" }
  );

  // Preview logic
  const getPreview = () => {
    const tier = form.tier || "Gold";
    const category = form.category || "Hardware";
    const ceiling = form.ceiling || 15;
    const chain = form.approvalChain || "Sales Manager";
    return `${tier} + ${category} → ${ceiling}% discount → ${chain === "None" ? "Auto-approved" : chain + " review required"}`;
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
      className="space-y-4"
    >
      <Select
        label="Customer Tier"
        options={TIER_OPTIONS}
        value={form.tier}
        onChange={(e) => setForm({ ...form, tier: e.target.value })}
      />
      
      <Select
        label="Product Category"
        options={CATEGORY_OPTIONS}
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />
      
      <Input
        label="Maximum Discount %"
        type="number"
        min={0}
        max={100}
        value={form.ceiling}
        onChange={(e) => setForm({ ...form, ceiling: Number(e.target.value) })}
      />
      
      <Select
        label="Required Approval Level"
        options={CHAIN_OPTIONS}
        value={form.approvalChain}
        onChange={(e) => setForm({ ...form, approvalChain: e.target.value })}
      />

      {/* Preview */}
      <div className="rounded-lg bg-blue-50/60 p-3 text-sm text-slate-600">
        <span className="font-medium text-blue-700">Preview:</span> {getPreview()}
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="secondary" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" loading={submitting}>
          {initialValue ? "Update Rule" : "Create Rule"}
        </Button>
      </div>
    </form>
  );
}