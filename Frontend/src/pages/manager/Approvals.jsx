import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import Input from "../../components/common/Input";
import Select from "../../components/common/Select";
import ViewToggle from "../../components/manager/ViewToggle";
import ApprovalQueue from "../../components/manager/ApprovalQueue";
import ApprovalCard from "../../components/manager/ApprovalCard";
import { MOCK_APPROVALS } from "../../utils/managerMockData";

const RISK_OPTIONS = [
  { value: "all", label: "All Risk Levels" },
  { value: "critical", label: "Critical (81-100)" },
  { value: "high", label: "High (61-80)" },
  { value: "medium", label: "Medium (31-60)" },
  { value: "low", label: "Low (0-30)" }
];

const STATUS_OPTIONS = [
  { value: "all", label: "All Status" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" }
];

export default function Approvals() {
  const navigate = useNavigate();
  const [view, setView] = useState("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [riskFilter, setRiskFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredApprovals = MOCK_APPROVALS.filter((approval) => {
    const matchesSearch = 
      approval.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      approval.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      approval.rep.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRisk = riskFilter === "all" || approval.riskLevel.toLowerCase() === riskFilter;
    const matchesStatus = statusFilter === "all" || approval.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesRisk && matchesStatus;
  });

  const pendingCount = filteredApprovals.filter(a => a.status === "Pending").length;

  return (
    <div>
      <PageHeader 
        title="Approval Queue" 
        description={`${pendingCount} live quotations awaiting your review`}
        actions={
          <ViewToggle view={view} onViewChange={setView} />
        }
      />

      <div className="mb-4 flex flex-wrap items-end gap-3 rounded-xl border border-blue-100 bg-white p-4 shadow-sm">
        <div className="w-56">
          <Input
            placeholder="Search quotation, customer, or rep..."
            icon={Search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="w-40">
          <Select
            label="Risk Level"
            options={RISK_OPTIONS}
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
          />
        </div>
        <div className="w-40">
          <Select
            label="Status"
            options={STATUS_OPTIONS}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          />
        </div>
        <button
          onClick={() => {
            setSearchQuery("");
            setRiskFilter("all");
            setStatusFilter("all");
          }}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
        >
          Reset
        </button>
      </div>

      {view === "table" ? (
        <ApprovalQueue 
          approvals={filteredApprovals} 
          onOpen={(a) => navigate(`/manager/approvals/${a.id}`)} 
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredApprovals.map((approval) => (
            <ApprovalCard 
              key={approval.id} 
              approval={approval} 
              onOpen={() => navigate(`/manager/approvals/${approval.id}`)} 
            />
          ))}
        </div>
      )}
    </div>
  );
}