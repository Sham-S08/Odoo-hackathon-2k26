import { useState } from "react";
import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";

const CATEGORY_OPTIONS = [
  { value: "Hardware", label: "Hardware" },
  { value: "Services", label: "Services" },
  { value: "Subscriptions", label: "Subscriptions" },
];

export default function ProductForm({ initialValue, onSubmit, onCancel, submitting }) {
  const [form, setForm] = useState(
    initialValue || { name: "", category: "Hardware", price: "", unit: "unit", tax: 0, description: "" }
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
        label="Product name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <Select
        label="Category"
        options={CATEGORY_OPTIONS}
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Price"
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <Input
          label="Tax %"
          type="number"
          value={form.tax}
          onChange={(e) => setForm({ ...form, tax: e.target.value })}
        />
      </div>
      <Input
        label="Unit"
        value={form.unit}
        onChange={(e) => setForm({ ...form, unit: e.target.value })}
      />
      <div>
        <label className="mb-1.5 block text-sm font-medium text-royal-800">Description</label>
        <textarea
          rows={3}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full rounded-lg border border-royal-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-royal-300"
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="secondary" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" loading={submitting}>
          Save product
        </Button>
      </div>
    </form>
  );
}
