import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, LogIn, Mail } from "lucide-react";
import Input from "../common/Input";
import Button from "../common/Button";
import { useAuthContext } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";
import { isEmail, isRequired } from "../../utils/validation";

export default function LoginForm() {
  const { login } = useAuthContext();
  const { notify } = useNotification();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  function validate() {
    const next = {};
    if (!isEmail(form.email)) next.email = "Enter a valid email address";
    if (!isRequired(form.password)) next.password = "Password is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const user = await login(form);
      notify(`Welcome back, ${user?.name || "there"}`, "success");
      const destinationByRole = {
        admin: "/admin",
        sales: "/sales",
        manager: "/manager",
        finance: "/finance",
        customer: "/portal",
      };
      navigate(destinationByRole[user?.role] || "/sales");
    } catch (err) {
      notify(err.message || "Could not log in", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        placeholder="••••••••"
        value={form.password}
        error={errors.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      {/* Remember Me — UI Only */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="rememberMe"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-400 focus:ring-2 cursor-pointer"
        />
        <label htmlFor="rememberMe" className="text-sm text-slate-600 cursor-pointer hover:text-slate-800 transition-colors">
          Remember me
        </label>
      </div>

      <Button 
        type="submit" 
        variant="primary" 
        icon={LogIn} 
        loading={loading} 
        className="w-full"
      >
        Log in
      </Button>
    </form>
  );
}