import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import Input from "../../components/common/Input";
import Card from "../../components/common/Card";
import ViewToggle from "../../components/manager/ViewToggle";
import DealHealthCard from "../../components/manager/DealHealthCard";
import { MOCK_DEAL_HEALTH } from "../../utils/managerMockData";

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
        description="AI-generated risk results for every quotation"
        actions={<ViewToggle view={view} onViewChange={setView} />}
      />

      <div className="mb-4 max-w-sm">
        <Input placeholder="Search customer or quotation..." icon={Search} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </div>

      {view === "cards" ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((deal) => (
            <DealHealthCard key={deal.id} deal={deal} onOpen={() => navigate(`/manager/approvals/${deal.id}`)} />
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
                  <th className="px-4 py-3 text-center font-medium text-slate-500">Stage</th>
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
                      <span className={`font-medium ${deal.riskScore >= 60 ? "text-rose-600" : deal.riskScore >= 40 ? "text-amber-600" : "text-emerald-600"}`}>
                        {deal.riskScore}/100
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center"><Badge tone="slate">{deal.stage}</Badge></td>
                    <td className="px-4 py-3 text-center">
                      <button onClick={() => navigate(`/manager/approvals/${deal.id}`)} className="text-blue-600 hover:underline text-sm">Review</button>
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