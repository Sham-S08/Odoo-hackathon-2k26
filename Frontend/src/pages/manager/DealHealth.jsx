import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import ViewToggle from "../../components/manager/ViewToggle";
import DealHealthCard from "../../components/manager/DealHealthCard";

const MOCK_DEAL_HEALTH = [
  { 
    id: "quo_5001", 
    customerName: "Acme Corp", 
    rep: "Priya Shah", 
    total: 24800, 
    riskScore: 68, 
    riskLevel: "HIGH",
    lastActivity: "2026-08-28T10:00:00Z",
    stage: "Pending Approval",
    stalled: 8
  },
  { 
    id: "quo_5004", 
    customerName: "Globex", 
    rep: "Dana Okafor", 
    total: 41500, 
    riskScore: 30, 
    riskLevel: "MEDIUM",
    lastActivity: "2026-08-20T09:00:00Z",
    stage: "Confirmed",
    stalled: 12
  },
  { 
    id: "quo_5003", 
    customerName: "Northwind Traders", 
    rep: "Priya Shah", 
    total: 15200, 
    riskScore: 45, 
    riskLevel: "MEDIUM",
    lastActivity: "2026-08-29T09:00:00Z",
    stage: "Under Negotiation",
    stalled: 4
  },
  { 
    id: "quo_5006", 
    customerName: "Innovation Labs", 
    rep: "Dana Okafor", 
    total: 8200, 
    riskScore: 22, 
    riskLevel: "LOW",
    lastActivity: "2026-09-01T11:00:00Z",
    stage: "Pending Approval",
    stalled: 2
  },
];

export default function DealHealth() {
  const navigate = useNavigate();
  const [view, setView] = useState("cards");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = MOCK_DEAL_HEALTH.filter((deal) =>
    deal.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    deal.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <PageHeader 
        title="Deal Health" 
        description="Monitor at-risk deals and take action"
        actions={
          <ViewToggle view={view} onViewChange={setView} />
        }
      />

      <div className="mb-4 max-w-sm">
        <Input
          placeholder="Search by customer or quotation..."
          icon={Search}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {view === "cards" ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((deal) => (
            <DealHealthCard 
              key={deal.id} 
              deal={deal} 
              onOpen={() => navigate(`/manager/approvals/${deal.id}`)} 
            />
          ))}
        </div>
      ) : (
        <Card padded={false}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-blue-100 bg-blue-50/40">
                  <th className="px-4 py-3 text-left font-medium text-slate-500">Quotation</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-500">Customer</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-500">Rep</th>
                  <th className="px-4 py-3 text-right font-medium text-slate-500">Amount</th>
                  <th className="px-4 py-3 text-center font-medium text-slate-500">Risk Score</th>
                  <th className="px-4 py-3 text-center font-medium text-slate-500">Stalled</th>
                  <th className="px-4 py-3 text-center font-medium text-slate-500">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((deal) => (
                  <tr key={deal.id} className="border-b border-blue-50 hover:bg-blue-50/40">
                    <td className="px-4 py-3 font-medium text-slate-700">{deal.id}</td>
                    <td className="px-4 py-3 text-slate-600">{deal.customerName}</td>
                    <td className="px-4 py-3 text-slate-600">{deal.rep}</td>
                    <td className="px-4 py-3 text-right text-slate-600">${deal.total.toLocaleString()}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`font-medium ${
                        deal.riskScore >= 70 ? "text-rose-600" :
                        deal.riskScore >= 40 ? "text-amber-600" : "text-emerald-600"
                      }`}>
                        {deal.riskScore}/100
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {deal.stalled > 5 ? (
                        <span className="text-rose-600 font-medium">{deal.stalled}d</span>
                      ) : (
                        <span className="text-slate-400">{deal.stalled}d</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => navigate(`/manager/approvals/${deal.id}`)}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}