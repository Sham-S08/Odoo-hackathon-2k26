import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/layout/PageHeader";
import Card from "../../components/common/Card";
import ViewToggle from "../../components/manager/ViewToggle";
import StalledDealCard from "../../components/manager/StalledDealCard";
import { useNotification } from "../../context/NotificationContext";

const MOCK_STALLED_DEALS = [
  { id: "quo_5004", customerName: "Globex", rep: "Dana Okafor", total: 41500, stalled: 12, lastActivity: "2026-08-20", riskLevel: "MEDIUM" },
  { id: "quo_5001", customerName: "Acme Corp", rep: "Priya Shah", total: 24800, stalled: 8, lastActivity: "2026-08-27", riskLevel: "HIGH" },
  { id: "quo_5006", customerName: "TechCorp", rep: "Marcus Lee", total: 18400, stalled: 6, lastActivity: "2026-08-29", riskLevel: "MEDIUM" },
];

export default function StalledDeals() {
  const navigate = useNavigate();
  const { notify } = useNotification();
  const [view, setView] = useState("cards");

  const handleNudge = (deal) => {
    notify(`Nudge sent to ${deal.rep} for ${deal.customerName}`, "success");
  };

  const handleEscalate = (deal) => {
    notify(`Escalation triggered for ${deal.customerName}`, "warning");
  };

  return (
    <div>
      <PageHeader 
        title="Stalled Deals" 
        description="Quotations inactive beyond the configured threshold"
        actions={
          <ViewToggle view={view} onViewChange={setView} />
        }
      />

      {view === "cards" ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MOCK_STALLED_DEALS.map((deal) => (
            <StalledDealCard
              key={deal.id}
              deal={deal}
              onOpen={() => navigate(`/manager/approvals/${deal.id}`)}
              onNudge={handleNudge}
              onEscalate={handleEscalate}
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
                  <th className="px-4 py-3 text-left font-medium text-slate-500">Sales Rep</th>
                  <th className="px-4 py-3 text-right font-medium text-slate-500">Amount</th>
                  <th className="px-4 py-3 text-center font-medium text-slate-500">Days Stalled</th>
                  <th className="px-4 py-3 text-center font-medium text-slate-500">Risk Level</th>
                  <th className="px-4 py-3 text-center font-medium text-slate-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_STALLED_DEALS.map((deal) => (
                  <tr key={deal.id} className="border-b border-blue-50 hover:bg-blue-50/40">
                    <td className="px-4 py-3 font-medium text-slate-700">{deal.id}</td>
                    <td className="px-4 py-3 text-slate-600">{deal.customerName}</td>
                    <td className="px-4 py-3 text-slate-600">{deal.rep}</td>
                    <td className="px-4 py-3 text-right text-slate-600">${deal.total.toLocaleString()}</td>
                    <td className="px-4 py-3 text-center font-medium text-amber-600">{deal.stalled} days</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`font-medium ${
                        deal.riskLevel === "HIGH" ? "text-rose-600" : "text-amber-600"
                      }`}>
                        {deal.riskLevel}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => navigate(`/manager/approvals/${deal.id}`)}
                          className="text-blue-600 hover:underline text-sm"
                        >
                          Review
                        </button>
                        <button
                          onClick={() => handleNudge(deal)}
                          className="text-amber-600 hover:underline text-sm"
                        >
                          Nudge
                        </button>
                        <button
                          onClick={() => handleEscalate(deal)}
                          className="text-rose-600 hover:underline text-sm"
                        >
                          Escalate
                        </button>
                      </div>
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