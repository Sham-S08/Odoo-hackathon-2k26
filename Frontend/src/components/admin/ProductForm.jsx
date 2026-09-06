import { useState } from "react";
import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";

const STATUS_OPTIONS = [{ value: "Active", label: "Active" }, { value: "Inactive", label: "Inactive" }];

export default function ProductForm({ initialValue, onSubmit, onCancel, submitting }) {
  const [form, setForm] = useState(initialValue || { sku: "", name: "", description: "", category: "Hardware", type: "Unit", basePrice: 0, taxRate: 0, status: "Active" });
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  return (
    <form onSubmit={(event) => { event.preventDefault(); onSubmit(form); }} className="space-y-4">
      <div className="grid grid-cols-2 gap-3"><Input label="SKU" value={form.sku} onChange={(e) => update("sku", e.target.value)} required /><Input label="Product Name" value={form.name} onChange={(e) => update("name", e.target.value)} required /></div>
      <Input label="Description" value={form.description || ""} onChange={(e) => update("description", e.target.value)} />
      <div className="grid grid-cols-2 gap-3"><Input label="Category" value={form.category} onChange={(e) => update("category", e.target.value)} required /><Input label="Unit" value={form.type || ""} onChange={(e) => update("type", e.target.value)} /></div>
      <div className="grid grid-cols-2 gap-3"><Input label="Base Price" type="number" min="0" step="0.01" value={form.basePrice} onChange={(e) => update("basePrice", Number(e.target.value))} required /><Input label="Tax Rate %" type="number" min="0" max="100" step="0.01" value={form.taxRate} onChange={(e) => update("taxRate", Number(e.target.value))} /></div>
      <Select label="Status" options={STATUS_OPTIONS} value={form.status} onChange={(e) => update("status", e.target.value)} />
      <div className="flex justify-end gap-2"><Button variant="secondary" type="button" onClick={onCancel}>Cancel</Button><Button variant="primary" type="submit" loading={submitting}>{initialValue ? "Update Product" : "Create Product"}</Button></div>
    </form>
  );
}