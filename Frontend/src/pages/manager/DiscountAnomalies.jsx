import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import ViewToggle from "../../components/manager/ViewToggle";
import DiscountAnomalyCard from "../../components/manager/DiscountAnomalyCard";

const MOCK_ANOMALIES = [
  { id: 1, repName: "Priya Shah", customer: "Acme Corp", product: "Setup Service", currentDiscount: 18, avgDiscount: 9, difference: 9, riskLevel: "HIGH" },
  { id: 2, repName: "Marcus Lee", customer: "TechCorp", product: "ProBook Laptop", currentDiscount: 22, avgDiscount: 11, difference: 11, riskLevel: "CRITICAL" },
  { id: 3, repName: "Priya Shah", customer: "Northwind Traders", product: "Support Plan", currentDiscount: 15, avgDiscount: 8, difference: 7, riskLevel: "MEDIUM" },
];

export default function DiscountAnomalies() {
  const navigate = useNavigate();
  const [view, setView] = useState("cards");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = MOCK_ANOMALIES.filter((anomaly) =>
    anomaly.repName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    anomaly.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <PageHeader 
        title="Discount Anomalies" 
        description="Unusual discount behavior requiring review"
        actions={
          <ViewToggle view={view} onViewChange={setView} />
        }
      />

      <div className="mb-4 max-w-sm">
        <Input
          placeholder="Search by rep or customer..."
          icon={Search}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {view === "cards" ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((anomaly) => (
            <DiscountAnomalyCard
              key={anomaly.id}
              anomaly={anomaly}
              onOpen={() => navigate(`/manager/approvals/quo_${anomaly.id}`)}
            />
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
                  <th className="px-4 py-3 text-center font-medium text-slate-500">Current Discount</th>
                  <th className="px-4 py-3 text-center font-medium text-slate-500">Average</th>
                  <th className="px-4 py-3 text-center font-medium text-slate-500">Deviation</th>
                  <th className="px-4 py-3 text-center font-medium text-slate-500">Risk Level</th>
                  <th className="px-4 py-3 text-center font-medium text-slate-500">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((anomaly) => (
                  <tr key={anomaly.id} className="border-b border-blue-50 hover:bg-blue-50/40">
                    <td className="px-4 py-3 font-medium text-slate-700">{anomaly.repName}</td>
                    <td className="px-4 py-3 text-slate-600">{anomaly.customer}</td>
                    <td className="px-4 py-3 text-slate-600">{anomaly.product}</td>
                    <td className="px-4 py-3 text-center font-medium text-rose-600">{anomaly.currentDiscount}%</td>
                    <td className="px-4 py-3 text-center text-slate-500">{anomaly.avgDiscount}%</td>
                    <td className="px-4 py-3 text-center font-medium text-amber-600">+{anomaly.difference}%</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`font-medium ${
                        anomaly.riskLevel === "CRITICAL" ? "text-red-600" :
                        anomaly.riskLevel === "HIGH" ? "text-rose-600" : "text-amber-600"
                      }`}>
                        {anomaly.riskLevel}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => navigate(`/manager/approvals/quo_${anomaly.id}`)}
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