import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MessageSquare } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import Input from "../../components/common/Input";
import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import { MOCK_NEGOTIATIONS } from "../../utils/managerMockData";

export default function Negotiations() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = MOCK_NEGOTIATIONS.filter((n) =>
    n.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <PageHeader title="Negotiations" description="Customer negotiation requests awaiting review" />

      <div className="mb-4 max-w-sm">
        <Input placeholder="Search by customer or quotation..." icon={Search} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </div>

      {filtered.length === 0 ? (
        <Card>
          <div className="py-12 text-center">
            <MessageSquare className="mx-auto h-12 w-12 text-slate-300" />
            <p className="mt-3 text-slate-500">No customer negotiations found</p>
          </div>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((n) => (
            <button
              key={n.id}
              onClick={() => navigate(`/manager/approvals/${n.quotationId}`)}
              className="flex w-full items-center justify-between rounded-xl border border-blue-100 bg-white p-4 text-left hover:shadow-md transition-shadow"
            >
              <div>
                <p className="font-medium text-slate-800">{n.customerName}</p>
                <p className="text-sm text-slate-500">{n.message}</p>
                <div className="mt-1 flex items-center gap-3 text-xs text-slate-400">
                  <span>Requested: {n.requestedDiscountPercent}%</span>
                  <span>Current: {n.currentDiscount}%</span>
                  <span>v{n.versionNumber}</span>
                </div>
              </div>
              <div className="text-right">
                <Badge tone="amber">Pending Review</Badge>
                <p className="mt-1 text-xs text-slate-400">{new Date(n.createdAt).toLocaleDateString()}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}