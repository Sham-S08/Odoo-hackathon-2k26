import { Link } from "react-router-dom";
import { Gauge } from "lucide-react";
import SignupForm from "../../components/auth/SignupForm";

export default function Signup() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-50/60 p-8">
      <div className="w-full max-w-md rounded-2xl border border-blue-100 bg-white p-8 shadow-lg">
        <div className="mb-6 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
            <Gauge className="h-5 w-5" />
          </div>
          <span className="font-display text-lg font-semibold text-slate-800">
            DealFlow360
          </span>
        </div>

        <h2 className="font-display text-2xl font-semibold text-slate-800">
          Set up your workspace
        </h2>
        <p className="mt-1 mb-6 text-sm text-slate-400">
          Create an account to configure products, discount tiers, and warehouses.
        </p>

        <SignupForm />

        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}