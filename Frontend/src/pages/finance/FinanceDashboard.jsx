import PageHeader from "../../components/layout/PageHeader";

export default function FinanceDashboard() {
  return (
    <div>
      <PageHeader
        title="Finance Dashboard"
        description="Second-level approvals, fulfillment, and billing overview"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-400">Pending high-risk approvals</p>
          <p className="mt-2 font-display text-2xl font-semibold text-slate-800">0</p>
        </div>
        <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-400">Orders to fulfill</p>
          <p className="mt-2 font-display text-2xl font-semibold text-slate-800">0</p>
        </div>
        <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-400">Pending invoices</p>
          <p className="mt-2 font-display text-2xl font-semibold text-slate-800">0</p>
        </div>
      </div>
      <p className="mt-6 text-sm text-slate-400">Finance dashboard content coming soon...</p>
    </div>
  );
}