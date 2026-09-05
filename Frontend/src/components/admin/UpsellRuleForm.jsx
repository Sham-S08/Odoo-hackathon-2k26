import { useState } from "react";
import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";

const RULE_TYPE_OPTIONS = [
  { value: "Upsell", label: "Upsell (higher value)" },
  { value: "Cross-sell", label: "Cross-sell (complementary)" },
];

const STATUS_OPTIONS = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
];

export default function UpsellRuleForm({ initialValue, onSubmit, onCancel, submitting }) {
  const [form, setForm] = useState(
    initialValue || { 
      baseProduct: "", 
      suggestedProduct: "", 
      ruleType: "Upsell", 
      promotion: "", 
      minimumMargin: 15, 
      priority: 1, 
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
        label="Base Product"
        value={form.baseProduct}
        onChange={(e) => setForm({ ...form, baseProduct: e.target.value })}
        required
      />
      
      <Input
        label="Suggested Product"
        value={form.suggestedProduct}
        onChange={(e) => setForm({ ...form, suggestedProduct: e.target.value })}
        required
      />
      
      <Select
        label="Rule Type"
        options={RULE_TYPE_OPTIONS}
        value={form.ruleType}
        onChange={(e) => setForm({ ...form, ruleType: e.target.value })}
      />
      
      <Input
        label="Promotion Tag (optional)"
        value={form.promotion}
        onChange={(e) => setForm({ ...form, promotion: e.target.value })}
        placeholder="e.g. Summer Sale, Bundle Deal"
      />
      
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Minimum Margin %"
          type="number"
          min={0}
          max={100}
          value={form.minimumMargin}
          onChange={(e) => setForm({ ...form, minimumMargin: Number(e.target.value) })}
        />
        <Input
          label="Priority"
          type="number"
          min={1}
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: Number(e.target.value) })}
        />
      </div>
      
      <Select
        label="Status"
        options={STATUS_OPTIONS}
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
      />

      <div className="rounded-lg bg-blue-50/60 p-3 text-xs text-slate-500">
        <span className="font-medium text-blue-600">Note:</span> Only rules with <span className="font-medium">Active</span> status 
        and satisfying the configured margin threshold will surface to Sales.
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