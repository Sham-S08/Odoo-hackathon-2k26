import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import Input from "../../components/common/Input";
import Card from "../../components/common/Card";
import ViewToggle from "../../components/manager/ViewToggle";
import DiscountAnomalyCard from "../../components/manager/DiscountAnomalyCard";
import { MOCK_DISCOUNT_ANOMALIES } from "../../utils/managerMockData";

export default function DiscountAnomalies() {
  const navigate = useNavigate();
  const [view, setView] = useState("cards");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = MOCK_DISCOUNT_ANOMALIES.filter((a) =>
    a.repName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <PageHeader 
        title="Discount Anomalies" 
        description="Unusual discount behavior requiring review"
        actions={<ViewToggle view={view} onViewChange={setView} />}
      />

      <div className="mb-4 max-w-sm">
        <Input placeholder="Search by rep or customer..." icon={Search} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </div>

      {view === "cards" ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((anomaly) => (
            <DiscountAnomalyCard key={anomaly.id} anomaly={anomaly} onOpen={() => navigate(`/manager/approvals/${anomaly.quotationId}`)} />
          ))}
        </div>
      ) : (
        <Card padded={false}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-blue-100 bg-blue-50/40">
                  <th className="px-4 py-3 text-left font-medium text-slate-500">Sales Rep</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-500">Customer</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-500">Product</th>
                  <th className="px-4 py-3 text-center font-medium text-slate-500">Current</th>
                  <th className="px-4 py-3 text-center font-medium text-slate-500">Average</th>
                  <th className="px-4 py-3 text-center font-medium text-slate-500">Deviation</th>
                  <th className="px-4 py-3 text-center font-medium text-slate-500">Risk</th>
                  <th className="px-4 py-3 text-center font-medium text-slate-500">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => (
                  <tr key={a.id} className="border-b border-blue-50 hover:bg-blue-50/40">
                    <td className="px-4 py-3 font-medium text-slate-700">{a.repName}</td>
                    <td className="px-4 py-3 text-slate-600">{a.customer}</td>
                    <td className="px-4 py-3 text-slate-600">{a.product}</td>
                    <td className="px-4 py-3 text-center font-medium text-rose-600">{a.currentDiscount}%</td>
                    <td className="px-4 py-3 text-center text-slate-500">{a.avgDiscount}%</td>
                    <td className="px-4 py-3 text-center font-medium text-amber-600">+{a.difference}%</td>
                    <td className="px-4 py-3 text-center"><Badge tone={a.riskLevel === "HIGH" ? "rose" : "amber"}>{a.riskLevel}</Badge></td>
                    <td className="px-4 py-3 text-center">
                      <button onClick={() => navigate(`/manager/approvals/${a.quotationId}`)} className="text-blue-600 hover:underline text-sm">Review</button>
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