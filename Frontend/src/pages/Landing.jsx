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
  Zap,
} from "lucide-react";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Discount Governance",
    text: "Multi-tier approval routing with blended risk scoring",
  },
  {
    icon: Sparkles,
    title: "Live Upsell Suggestions",
    text: "Real-time margin impact as reps build quotations",
  },
  {
    icon: Split,
    title: "Warehouse Fulfillment",
    text: "Auto-split orders across warehouses based on live stock",
  },
  {
    icon: Repeat,
    title: "Hybrid Billing",
    text: "One-time and recurring lines, prorated correctly",
  },
  {
    icon: LineChart,
    title: "Deal Health Monitoring",
    text: "Spot stalled quotes and discount anomalies early",
  },
  {
    icon: Users,
    title: "Customer Portal Negotiation",
    text: "Customers negotiate live, no email back-and-forth",
  },
];



export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/80 via-white to-blue-100/60">
      
      {/* Navbar — Static, Full Width */}
      <header className="border-b border-blue-100/50 bg-white/70 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 text-white shadow-md">
              <Gauge className="h-5 w-5" />
            </div>
            <span className="font-display text-lg font-semibold text-slate-800">
              DealFlow<span className="text-blue-600">360</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors px-3 py-1.5"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 px-5 py-2 text-sm font-medium text-white shadow-md hover:shadow-lg hover:scale-105 transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-5xl px-6 pt-20 pb-12 text-center">
        <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full bg-blue-100/70 backdrop-blur-sm border border-blue-200/50 px-5 py-1.5 text-xs font-medium text-blue-700">
          <Zap className="h-3.5 w-3.5" />
          Intelligent · Self-Governing · B2B Sales
        </div>

        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-slate-800">
          Beyond Quote-to-Invoice.
          <br />
          <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Run a Self-Governing Deal Engine.
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base text-slate-500 leading-relaxed">
          DealFlow360 enforces pricing discipline, reacts to inventory in real time,
          and gives reps &amp; customers a living, negotiable quotation — not a static PDF.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/signup"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 px-7 py-3.5 text-sm font-medium text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            Start Free Trial
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/login"
            className="rounded-xl border border-slate-200 bg-white/70 backdrop-blur-sm px-7 py-3.5 text-sm font-medium text-slate-700 hover:bg-white hover:shadow-md transition-all"
          >
            Log in →
          </Link>
        </div>

        {/* Stats */}

      </section>

      {/* Features Section */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="group rounded-2xl bg-white/50 backdrop-blur-sm border border-white/60 shadow-sm p-6 hover:bg-white/80 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-blue-200/60 text-blue-600 group-hover:from-blue-500 group-hover:to-blue-400 group-hover:text-white transition-all">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-base font-semibold text-slate-800">
                {title}
              </h3>
              <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-blue-500 px-8 py-12 text-white text-center">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
          
          <div className="relative z-10">
            <h2 className="font-display text-3xl font-semibold">
              Ready to transform your sales operations?
            </h2>
            <p className="mt-2 text-blue-100 max-w-xl mx-auto">
              Set up your workspace and create your first quotation in minutes.
            </p>
            <Link
              to="/signup"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-medium text-blue-700 shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-blue-100/50 py-6 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} DealFlow360 — Built for B2B sales teams.
      </footer>
    </div>
  );
}