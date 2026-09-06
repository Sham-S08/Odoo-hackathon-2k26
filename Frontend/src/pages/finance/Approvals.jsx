import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import Input from "../../components/common/Input";
import Select from "../../components/common/Select";
import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import { formatCurrency } from "../../utils/formatCurrency";
import { MOCK_FINANCE_APPROVALS } from "../../utils/financeMockData";

const RISK_OPTIONS = [
  { value: "all", label: "All Risk Levels" },
  { value: "critical", label: "Critical" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" }
];

const STATUS_OPTIONS = [
  { value: "all", label: "All Status" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" }
];

export default function FinanceApprovals() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [riskFilter, setRiskFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = MOCK_FINANCE_APPROVALS.filter((a) => {
    const matchesSearch = a.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRisk = riskFilter === "all" || a.riskLevel.toLowerCase() === riskFilter;
    const matchesStatus = statusFilter === "all" || a.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesRisk && matchesStatus;
  });

  const pendingCount = filtered.filter(a => a.status === "Pending").length;

  return (
    <div>
      <PageHeader 
        title="High-Risk Approvals" 
        description={`${pendingCount} quotations requiring Finance review`} 
      />

      <div className="mb-4 flex flex-wrap items-end gap-3 rounded-xl border border-blue-100 bg-white p-4 shadow-sm">
        <div className="w-56">
          <Input
            placeholder="Search by ID or customer..."
            icon={Search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="w-40">
          <Select label="Risk Level" options={RISK_OPTIONS} value={riskFilter} onChange={(e) => setRiskFilter(e.target.value)} />
        </div>
        <div className="w-40">
          <Select label="Status" options={STATUS_OPTIONS} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} />
        </div>
        <button
          onClick={() => { setSearchQuery(""); setRiskFilter("all"); setStatusFilter("all"); }}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
        >
          Reset
        </button>
      </div>

      <Card padded={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-blue-100 bg-blue-50/40">
                <th className="px-4 py-3 text-left font-medium text-slate-500">Quotation</th>
                <th className="px-4 py-3 text-left font-medium text-slate-500">Customer</th>
                <th className="px-4 py-3 text-left font-medium text-slate-500">Rep</th>
                <th className="px-4 py-3 text-right font-medium text-slate-500">Amount</th>
                <th className="px-4 py-3 text-center font-medium text-slate-500">Discount</th>
                <th className="px-4 py-3 text-center font-medium text-slate-500">Risk</th>
                <th className="px-4 py-3 text-center font-medium text-slate-500">Status</th>
                <th className="px-4 py-3 text-center font-medium text-slate-500">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id} className="border-b border-blue-50 hover:bg-blue-50/40">
                  <td className="px-4 py-3 font-medium text-slate-700">{a.id}</td>
                  <td className="px-4 py-3 text-slate-600">{a.customerName}</td>
                  <td className="px-4 py-3 text-slate-600">{a.rep}</td>
                  <td className="px-4 py-3 text-right text-slate-600">{formatCurrency(a.total)}</td>
                  <td className="px-4 py-3 text-center text-slate-600">{a.discount}%</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`font-medium ${a.riskScore >= 60 ? "text-rose-600" : a.riskScore >= 40 ? "text-amber-600" : "text-emerald-600"}`}>
                      {a.riskScore}/100
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Badge tone={a.status === "Pending" ? "amber" : a.status === "Approved" ? "green" : "rose"}>
                      {a.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => navigate(`/finance/approvals/${a.id}`)} className="text-blue-600 hover:underline text-sm">
                      Review
                    </button>
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