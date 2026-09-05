import { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";

export default function WarehouseForm({ initialValue, onSubmit, onCancel, submitting }) {
  const [form, setForm] = useState(
    initialValue || { name: "", location: "", stockLevel: "", shippingWeight: 1 }
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
        label="Warehouse name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <Input
        label="Location"
        value={form.location}
        onChange={(e) => setForm({ ...form, location: e.target.value })}
      />
      <Input
        label="Replenishment / stock notes"
        value={form.stockLevel}
        onChange={(e) => setForm({ ...form, stockLevel: e.target.value })}
      />
      <Input
        label="Shipping cost weighting"
        type="number"
        value={form.shippingWeight}
        onChange={(e) => setForm({ ...form, shippingWeight: e.target.value })}
      />
      <div className="flex justify-end gap-2">
        <Button variant="secondary" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" loading={submitting}>
          Save warehouse
        </Button>
      </div>
    </form>
  );
}
