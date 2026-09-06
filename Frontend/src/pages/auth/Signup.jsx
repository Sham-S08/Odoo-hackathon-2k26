import { Link } from "react-router-dom";
import { Gauge, ArrowLeft } from "lucide-react";
import SignupForm from "../../components/auth/SignupForm";

export default function Signup() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50/90 via-blue-50/50 to-blue-100/60 p-8">
      <div className="w-full max-w-md rounded-3xl bg-white/90 backdrop-blur-sm border border-white/60 shadow-xl p-8">

        {/* Logo */}
        <div className="mb-6 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 text-white shadow-md">
            <Gauge className="h-5 w-5" />
          </div>
          <span className="font-display text-lg font-semibold text-slate-800">
            DealFlow<span className="text-blue-600">360</span>
          </span>
        </div>

        {/* Back to Home */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-blue-600 transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

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