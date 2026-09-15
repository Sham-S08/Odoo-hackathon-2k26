import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import Input from "../../components/common/Input";
import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import { SAMPLE_CUSTOMER_QUOTATIONS } from "../../utils/sampleData";

function displayStatus(status) {
  if (status === "Approved") return "Awaiting Confirmation";
  if (status === "Confirmed") return "Confirmed";
  if (status === "Under Negotiation") return "Under Negotiation";
  if (status === "Pending Approval") return "Under Review";
  return status || "Quotation";
}

const STATUS_TONES = {
  "Draft": "blue",
  "Pending Approval": "blue",
  "Approved": "purple",
  "Confirmed": "green",
  "Under Negotiation": "amber",
};

export default function CustomerQuotations() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = SAMPLE_CUSTOMER_QUOTATIONS.filter((q) =>
    q.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <PageHeader 
        title="My Quotations" 
        description="All quotations shared with you" 
      />

      <div className="mb-4 max-w-sm">
        <Input
          placeholder="Search by quotation ID..."
          icon={Search}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Card padded={false}>
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-slate-400">No quotations found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-blue-100 bg-blue-50/40">
                  <th className="px-4 py-3 text-left font-medium text-slate-500">Quotation</th>
                  <th className="px-4 py-3 text-right font-medium text-slate-500">Amount</th>
                  <th className="px-4 py-3 text-center font-medium text-slate-500">Status</th>
                  <th className="px-4 py-3 text-center font-medium text-slate-500">Version</th>
                  <th className="px-4 py-3 text-center font-medium text-slate-500">Date</th>
                  <th className="px-4 py-3 text-center font-medium text-slate-500">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((q) => (
                  <tr key={q.id} className="border-b border-blue-50 hover:bg-blue-50/40">
                    <td className="px-4 py-3 font-medium text-slate-700">{q.id}</td>
                    <td className="px-4 py-3 text-right text-slate-600">
                      ${q.total.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Badge tone={STATUS_TONES[q.stage] || "slate"}>
                        {displayStatus(q.stage)}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-center text-slate-500">v{q.versionNumber || 1}</td>
                    <td className="px-4 py-3 text-center text-slate-500">
                      {new Date(q.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => navigate(`/portal/quotations/${q.id}`)}
                        className="text-blue-600 hover:underline text-sm font-medium"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}