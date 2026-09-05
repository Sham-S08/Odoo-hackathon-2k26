import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, Lock, Mail, User, UserPlus } from "lucide-react";
import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";
import { useAuthContext } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";
import { isEmail, isRequired, validatePassword } from "../../utils/validation";
import { ROLES } from "../../utils/constants";

const ROLE_OPTIONS = [
  { value: ROLES.SALES, label: "Sales Representative" },
  { value: ROLES.MANAGER, label: "Sales Manager" },
  { value: ROLES.FINANCE, label: "Finance Manager" },
  { value: ROLES.ADMIN, label: "Admin" },
];

// Role descriptions for the help text
const ROLE_DESCRIPTIONS = {
  [ROLES.SALES]: "Create quotations, respond to customer negotiations",
  [ROLES.MANAGER]: "Approve/reject quotes, configure discount rules, monitor deal health",
  [ROLES.FINANCE]: "Second-level approvals, warehouse fulfillment, billing",
  [ROLES.ADMIN]: "Configure products, price lists, warehouses, subscription plans",
};

export default function SignupForm() {
  const { register } = useAuthContext();
  const { notify } = useNotification();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    password: "",
    role: ROLES.SALES,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState(ROLES.SALES);

  function validate() {
    const next = {};
    if (!isRequired(form.name)) next.name = "Your name is required";
    if (!isRequired(form.company)) next.company = "Company name is required";
    if (!isEmail(form.email)) next.email = "Enter a valid email address";
    if (!validatePassword(form.password)) next.password = "Use at least 8 characters";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const user = await register(form);
      notify("Account created. Let's set up your workspace.", "success");
      navigate(`/${user?.role || ROLES.SALES}`);
    } catch (err) {
      notify(err.message || "Could not create account", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Full name"
        icon={User}
        name="name"
        placeholder="Jordan Lee"
        value={form.name}
        error={errors.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <Input
        label="Company"
        icon={Building2}
        name="company"
        placeholder="Acme Corp"
        value={form.company}
        error={errors.company}
        onChange={(e) => setForm({ ...form, company: e.target.value })}
      />
      <Input
        label="Work email"
        icon={Mail}
        type="email"
        name="email"
        placeholder="you@company.com"
        value={form.email}
        error={errors.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <Input
        label="Password"
        icon={Lock}
        type="password"
        name="password"
        placeholder="At least 8 characters"
        value={form.password}
        error={errors.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <Select
        label="Your role"
        name="role"
        options={ROLE_OPTIONS}
        value={form.role}
        onChange={(e) => {
          const role = e.target.value;
          setForm({ ...form, role });
          setSelectedRole(role);
        }}
      />
      {selectedRole && ROLE_DESCRIPTIONS[selectedRole] && (
        <p className="text-xs text-slate-400 -mt-2 pb-1">
          {ROLE_DESCRIPTIONS[selectedRole]}
        </p>
      )}
      <Button
        type="submit"
        variant="primary"
        icon={UserPlus}
        loading={loading}
        className="w-full"
      >
        Create account
      </Button>
    </form>
  );
}