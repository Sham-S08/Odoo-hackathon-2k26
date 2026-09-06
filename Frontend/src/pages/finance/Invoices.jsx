import { useState } from "react";
import { Search, Download, Eye } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import Input from "../../components/common/Input";
import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import { formatCurrency } from "../../utils/formatCurrency";
import { MOCK_BILLING } from "../../utils/financeMockData";

const STATUS_TONES = {
  "Pending": "amber",
  "Paid": "green",
  "Overdue": "rose"
};

export default function Invoices() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = MOCK_BILLING.invoices.filter((inv) => {
    const matchesSearch = inv.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || inv.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalOutstanding = filtered.filter(i => i.status === "Pending").reduce((sum, i) => sum + i.amount, 0);

  return (
    <div>
      <PageHeader 
        title="Invoices" 
        description="All invoices and payment status"
        actions={
          <div className="flex items-center gap-2">
            <Badge tone="amber">{MOCK_BILLING.summary.pending} Pending</Badge>
            <Badge tone="green">{MOCK_BILLING.summary.paid} Paid</Badge>
            <span className="text-sm font-medium text-slate-600">
              Total Outstanding: {formatCurrency(totalOutstanding)}
            </span>
          </div>
        }
      />

      <div className="mb-4 flex flex-wrap gap-3">
        <div className="w-64">
          <Input placeholder="Search by ID or customer..." icon={Search} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>

      <Card padded={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-blue-100 bg-blue-50/40">
                <th className="px-4 py-3 text-left font-medium text-slate-500">Invoice</th>
                <th className="px-4 py-3 text-left font-medium text-slate-500">Customer</th>
                <th className="px-4 py-3 text-right font-medium text-slate-500">Amount</th>
                <th className="px-4 py-3 text-center font-medium text-slate-500">Due Date</th>
                <th className="px-4 py-3 text-center font-medium text-slate-500">Status</th>
                <th className="px-4 py-3 text-center font-medium text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inv) => (
                <tr key={inv.id} className="border-b border-blue-50 hover:bg-blue-50/40">
                  <td className="px-4 py-3 font-medium text-slate-700">{inv.id}</td>
                  <td className="px-4 py-3 text-slate-600">{inv.customerName}</td>
                  <td className="px-4 py-3 text-right font-medium text-slate-800">{formatCurrency(inv.amount)}</td>
                  <td className="px-4 py-3 text-center text-slate-500">{new Date(inv.dueDate).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-center">
                    <Badge tone={STATUS_TONES[inv.status] || "slate"}>{inv.status}</Badge>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center gap-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-slate-400 hover:text-slate-600">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}