import { Link } from "react-router-dom";
import { Gauge, ShieldCheck, Split, Repeat, ArrowLeft } from "lucide-react";
import LoginForm from "../../components/auth/LoginForm";

const HIGHLIGHTS = [
  { icon: ShieldCheck, text: "Blended discount risk scoring on every quote" },
  { icon: Split, text: "Auto-split fulfillment across warehouses" },
  { icon: Repeat, text: "One-time and recurring lines, billed correctly" },
];

export default function Login() {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      
      {/* Left Panel — Styling Only */}
      <div className="hidden flex-col justify-between bg-gradient-to-br from-blue-50/90 via-blue-50/50 to-blue-100/60 p-12 lg:flex">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 text-white shadow-md">
            <Gauge className="h-5 w-5" />
          </div>
          <span className="font-display text-lg font-semibold text-slate-800">
            DealFlow<span className="text-blue-600">360</span>
          </span>
        </div>

        <div>
          <h1 className="font-display text-4xl font-semibold leading-tight text-slate-800">
            A self-governing deal engine for <br />
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">B2B sales teams.</span>
          </h1>
          <p className="mt-4 max-w-md text-slate-500 leading-relaxed">
            From quotation to cash, with pricing discipline, live inventory reality,
            and negotiable quotes built in.
          </p>
          <div className="mt-8 space-y-3">
            {HIGHLIGHTS.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-sm text-slate-600">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100/80 text-blue-600">
                  <Icon className="h-4 w-4" />
                </div>
                {text}
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-slate-400">© {new Date().getFullYear()} DealFlow360</p>
      </div>

      {/* Right Panel — Styling Only */}
      <div className="flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-sm">

          {/* Mobile Logo */}
          <div className="mb-8 lg:hidden">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 text-white shadow-md">
                <Gauge className="h-5 w-5" />
              </div>
              <span className="font-display text-lg font-semibold text-slate-800">
                DealFlow<span className="text-blue-600">360</span>
              </span>
            </div>
          </div>

          {/* Back to Home */}
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-blue-600 transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <h2 className="font-display text-2xl font-semibold text-slate-800">Welcome back</h2>
          <p className="mt-1 mb-6 text-sm text-slate-400">
            Log in to your sales workspace
          </p>

          <LoginForm />

          <p className="mt-6 text-center text-sm text-slate-400">
            New to DealFlow360?{" "}
            <Link to="/signup" className="font-medium text-blue-600 hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}