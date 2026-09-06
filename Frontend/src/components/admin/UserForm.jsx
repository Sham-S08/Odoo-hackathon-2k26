import { useState } from "react";
import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";
import { ROLES } from "../../utils/constants";

const ROLE_OPTIONS = [
  { value: ROLES.SALES, label: "Sales Representative" },
  { value: ROLES.MANAGER, label: "Sales Manager" },
  { value: ROLES.FINANCE, label: "Finance Manager" },
  { value: ROLES.ADMIN, label: "Admin" },
];

const STATUS_OPTIONS = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
];

export default function UserForm({ initialValue, onSubmit, onCancel, submitting }) {
  const [form, setForm] = useState(
    initialValue || { 
      name: "", 
      email: "", 
      role: ROLES.SALES, 
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
        label="Full Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      
      <Input
        label="Email"
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />

      {!initialValue && <Input
        label="Temporary Password"
        type="password"
        value={form.password || ""}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        minLength={8}
        required
      />}
      
      <Select
        label="Role"
        options={ROLE_OPTIONS}
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
      />
      
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
          {initialValue ? "Update User" : "Create User"}
        </Button>
      </div>
    </form>
  );
}