import { Link } from "react-router-dom";
import {
  Gauge,
  ArrowRight,
  ShieldCheck,
  Split,
  Repeat,
  LineChart,
  Users,
  Sparkles,
} from "lucide-react";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Discount governance",
    text: "Multi-tier approval routing with blended risk scoring on every quote.",
  },
  {
    icon: Sparkles,
    title: "Live upsell suggestions",
    text: "Real-time margin impact as reps build the quotation.",
  },
  {
    icon: Split,
    title: "Warehouse fulfillment",
    text: "Auto-split orders across warehouses based on live stock.",
  },
  {
    icon: Repeat,
    title: "Hybrid billing",
    text: "One-time and recurring lines, prorated and billed correctly.",
  },
  {
    icon: LineChart,
    title: "Deal health monitoring",
    text: "Spot stalled quotes and discount anomalies before they cost you.",
  },
  {
    icon: Users,
    title: "Customer portal negotiation",
    text: "Customers negotiate live on the quotation, no email back-and-forth.",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-blue-50/60 text-slate-800">
      {/* Nav */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
            <Gauge className="h-5 w-5" />
          </div>
          <span className="font-display text-lg font-semibold text-slate-800">DealFlow360</span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-sm font-medium text-slate-600 hover:text-slate-800"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 pb-20 pt-16 text-center">
        <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-xs font-medium text-blue-700">
          <Sparkles className="h-3.5 w-3.5" />
          An intelligent, self-governing sales operations platform
        </div>

        <h1 className="font-display text-4xl font-semibold leading-tight text-slate-800 sm:text-5xl">
          Go beyond a quote-to-invoice form.
          <br />
          <span className="text-blue-600">Run a self-governing deal engine.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-slate-500">
          DealFlow360 enforces pricing discipline, reacts to inventory reality in
          real time, keeps subscriptions and one-time sales reconciled on a single
          order, and gives reps and customers a living, negotiable quotation
          instead of a static PDF.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/signup"
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors"
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/login"
            className="rounded-lg border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Log in
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-base font-semibold text-slate-800">
                {title}
              </h3>
              <p className="mt-2 text-sm text-slate-500">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA band */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-blue-600 px-8 py-10 text-white sm:flex-row">
          <div>
            <h2 className="font-display text-2xl font-semibold">
              Ready to run your sales operations differently?
            </h2>
            <p className="mt-1 text-blue-100">
              Set up your workspace and create your first quotation in minutes.
            </p>
          </div>
          <Link
            to="/signup"
            className="flex shrink-0 items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-medium text-blue-700 hover:bg-blue-50 transition-colors"
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-blue-100 py-8 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} DealFlow360
      </footer>
    </div>
  );
}