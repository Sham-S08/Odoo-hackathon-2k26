import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/layout/PageHeader";
import { useApprovals } from "../../hooks/useApprovals";
import { useOrders } from "../../hooks/useOrders";
import { useInvoices } from "../../hooks/useInvoices";

export default function FinanceDashboard() {
  const navigate = useNavigate();
  const { approvals } = useApprovals();
  const { orders } = useOrders();
  const { invoices } = useInvoices();
  return (
    <div>
      <PageHeader
        title="Finance Dashboard"
        description="Second-level approvals, fulfillment, and billing overview"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-400">Pending high-risk approvals</p>
          <button onClick={() => navigate("/finance/approvals")} className="mt-2 font-display text-2xl font-semibold text-slate-800">{approvals.length}</button>
        </div>
        <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-400">Orders to fulfill</p>
          <button onClick={() => navigate("/finance/fulfillment")} className="mt-2 font-display text-2xl font-semibold text-slate-800">{orders.filter((order) => order.status !== "COMPLETED").length}</button>
        </div>
        <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-400">Pending invoices</p>
          <button onClick={() => navigate("/finance/invoices")} className="mt-2 font-display text-2xl font-semibold text-slate-800">{invoices.filter((invoice) => invoice.status !== "PAID").length}</button>
        </div>
      </div>
      <p className="mt-6 text-sm text-slate-500">Live data from approvals, orders, and invoices.</p>
    </div>
  );
}