import PageHeader from "../../components/layout/PageHeader";
import StatCard from "../../components/dashboard/StatCard";
import { CreditCard, CircleDollarSign, Clock3 } from "lucide-react";
import { useInvoices } from "../../hooks/useInvoices";

export default function Billing() {
  const { invoices, loading, error } = useInvoices();
  const issued = invoices.filter((invoice) => invoice.status === "ISSUED");
  const paid = invoices.filter((invoice) => invoice.status === "PAID");
  const outstanding = issued.reduce((sum, invoice) => sum + Number(invoice.total || 0), 0);
  const collected = paid.reduce((sum, invoice) => sum + Number(invoice.total || 0), 0);
  return (
    <div>
      <PageHeader title="Billing" description="Recurring billing and subscription management" />
      {error ? <p className="mb-4 rounded-lg bg-rose-50 p-4 text-sm text-rose-700">{error}</p> : null}
      {loading ? <p className="text-sm text-slate-500">Loading billing...</p> : <div className="grid grid-cols-1 gap-4 sm:grid-cols-3"><StatCard label="Outstanding" value={`$${outstanding.toFixed(2)}`} icon={Clock3} tone="amber" /><StatCard label="Collected" value={`$${collected.toFixed(2)}`} icon={CircleDollarSign} tone="green" /><StatCard label="Total invoices" value={invoices.length} icon={CreditCard} tone="blue" /></div>}
    </div>
  );
}