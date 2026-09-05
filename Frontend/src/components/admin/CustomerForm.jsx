import { useState } from "react";
import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";

const TIER_OPTIONS = [
  { value: "Bronze", label: "Bronze (up to 5%)" },
  { value: "Silver", label: "Silver (up to 10%)" },
  { value: "Gold", label: "Gold (up to 15%)" },
];

const STATUS_OPTIONS = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
];

const CURRENCY_OPTIONS = [
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
  { value: "GBP", label: "GBP" },
  { value: "INR", label: "INR" },
];

export default function CustomerForm({ initialValue, onSubmit, onCancel, submitting }) {
  const [form, setForm] = useState(
    initialValue || { 
      name: "", 
      tier: "Silver", 
      contactEmail: "", 
      currency: "USD",
      status: "Active",
      phone: "",
      address: ""
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
        label="Company Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      
      <Input
        label="Contact Email"
        type="email"
        value={form.contactEmail}
        onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
        required
      />
      
      <Input
        label="Phone"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />
      
      <Input
        label="Address"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />
      
      <div className="grid grid-cols-2 gap-3">
        <Select
          label="Customer Tier"
          options={TIER_OPTIONS}
          value={form.tier}
          onChange={(e) => setForm({ ...form, tier: e.target.value })}
        />
        <Select
          label="Currency"
          options={CURRENCY_OPTIONS}
          value={form.currency}
          onChange={(e) => setForm({ ...form, currency: e.target.value })}
        />
      </div>
      
      <Select
        label="Status"
        options={STATUS_OPTIONS}
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
      />

      <div className="flex justify-end gap-2">
        <Button variant="secondary" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" loading={submitting}>
          {initialValue ? "Update Customer" : "Create Customer"}
        </Button>
      </div>
    </form>
  );
}