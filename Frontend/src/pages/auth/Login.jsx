import { Link } from "react-router-dom";
import { Gauge, ShieldCheck, Split, Repeat } from "lucide-react";
import LoginForm from "../../components/auth/LoginForm";

const HIGHLIGHTS = [
  { icon: ShieldCheck, text: "Blended discount risk scoring on every quote" },
  { icon: Split, text: "Auto-split fulfillment across warehouses" },
  { icon: Repeat, text: "One-time and recurring lines, billed correctly" },
];

export default function Login() {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="hidden flex-col justify-between bg-royal-900 p-12 text-white lg:flex">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl brand-gradient">
            <Gauge className="h-5 w-5" />
          </div>
          <span className="font-display text-lg font-semibold">DealFlow360</span>
        </div>

        <div>
          <h1 className="font-display text-4xl font-semibold leading-tight">
            A self-governing deal engine for B2B sales teams.
          </h1>
          <p className="mt-4 max-w-md text-royal-200">
            From quotation to cash, with pricing discipline, live inventory reality,
            and negotiable quotes built in.
          </p>
          <div className="mt-8 space-y-3">
            {HIGHLIGHTS.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-sm text-royal-100">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                  <Icon className="h-4 w-4" />
                </div>
                {text}
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-royal-300">© {new Date().getFullYear()} DealFlow360</p>
      </div>

      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl brand-gradient text-white">
                <Gauge className="h-5 w-5" />
              </div>
              <span className="font-display text-lg font-semibold text-royal-900">
                DealFlow360
              </span>
            </div>
          </div>

          <h2 className="font-display text-2xl font-semibold text-royal-900">Welcome back</h2>
          <p className="mt-1 mb-6 text-sm text-royal-400">
            Log in to your sales workspace
          </p>

          <LoginForm />

          <p className="mt-6 text-center text-sm text-royal-400">
            New to DealFlow360?{" "}
            <Link to="/signup" className="font-medium text-royal-600 hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
