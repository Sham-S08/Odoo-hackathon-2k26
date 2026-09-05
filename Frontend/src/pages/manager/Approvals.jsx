import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import Input from "../../components/common/Input";
import Select from "../../components/common/Select";
import ViewToggle from "../../components/manager/ViewToggle";
import ApprovalQueue from "../../components/manager/ApprovalQueue";
import ApprovalCard from "../../components/manager/ApprovalCard";

// Mock data - 6 items with different risk levels
const MOCK_APPROVALS = [
  { 
    id: "quo_5001", 
    customerName: "Acme Corp", 
    rep: "Priya Shah", 
    total: 24800, 
    discount: 18, 
    riskScore: 68, 
    riskLevel: "HIGH",
    status: "Pending",
    submittedAt: "2026-09-05T10:00:00Z",
    category: "Services",
    items: 4,
    customerTier: "Gold"
  },
  { 
    id: "quo_5002", 
    customerName: "Beta Industries", 
    rep: "Marcus Lee", 
    total: 9600, 
    discount: 22, 
    riskScore: 85, 
    riskLevel: "CRITICAL",
    status: "Pending",
    submittedAt: "2026-09-05T08:30:00Z",
    category: "Hardware",
    items: 3,
    customerTier: "Silver"
  },
  { 
    id: "quo_5003", 
    customerName: "Northwind Traders", 
    rep: "Priya Shah", 
    total: 15200, 
    discount: 15, 
    riskScore: 45, 
    riskLevel: "MEDIUM",
    status: "Pending",
    submittedAt: "2026-09-04T14:00:00Z",
    category: "Subscriptions",
    items: 5,
    customerTier: "Bronze"
  },
  { 
    id: "quo_5004", 
    customerName: "Globex", 
    rep: "Dana Okafor", 
    total: 41500, 
    discount: 10, 
    riskScore: 28, 
    riskLevel: "LOW",
    status: "Approved",
    submittedAt: "2026-09-03T09:00:00Z",
    category: "Hardware",
    items: 8,
    customerTier: "Gold",
    approvedBy: "You",
    approvedAt: "2026-09-03T11:00:00Z"
  },
  { 
    id: "quo_5005", 
    customerName: "TechCorp", 
    rep: "Marcus Lee", 
    total: 18400, 
    discount: 30, 
    riskScore: 92, 
    riskLevel: "CRITICAL",
    status: "Rejected",
    submittedAt: "2026-09-02T16:00:00Z",
    category: "Services",
    items: 6,
    customerTier: "Gold",
    rejectedBy: "You",
    rejectedAt: "2026-09-02T17:00:00Z",
    rejectionReason: "Excessive discount on services (30% vs 10% ceiling)"
  },
  { 
    id: "quo_5006", 
    customerName: "Innovation Labs", 
    rep: "Dana Okafor", 
    total: 8200, 
    discount: 8, 
    riskScore: 22, 
    riskLevel: "LOW",
    status: "Pending",
    submittedAt: "2026-09-01T11:00:00Z",
    category: "Hardware",
    items: 2,
    customerTier: "Silver"
  },
];

const RISK_OPTIONS = [
  { value: "all", label: "All Risk Levels" },
  { value: "critical", label: "Critical (81-100)" },
  { value: "high", label: "High (61-80)" },
  { value: "medium", label: "Medium (31-60)" },
  { value: "low", label: "Low (0-30)" },
];

const STATUS_OPTIONS = [
  { value: "all", label: "All Status" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
];

export default function Approvals() {
  const navigate = useNavigate();
  const [view, setView] = useState("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [riskFilter, setRiskFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [repFilter, setRepFilter] = useState("all");
  const [approvals, setApprovals] = useState(MOCK_APPROVALS);

  // Handle approve/reject from detail page
  const handleDecision = (id, action, reason) => {
    setApprovals(prev => 
      prev.map(a => {
        if (a.id === id) {
          const isApproved = action === "approve";
          return {
            ...a,
            status: isApproved ? "Approved" : "Rejected",
            approvedBy: isApproved ? "You" : undefined,
            rejectedBy: !isApproved ? "You" : undefined,
            approvedAt: isApproved ? new Date().toISOString() : undefined,
            rejectedAt: !isApproved ? new Date().toISOString() : undefined,
            rejectionReason: !isApproved ? reason : undefined,
          };
        }
        return a;
      })
    );
  };

  const filteredApprovals = approvals.filter((approval) => {
    const matchesSearch = 
      approval.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      approval.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      approval.rep.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRisk = riskFilter === "all" || approval.riskLevel.toLowerCase() === riskFilter;
    const matchesStatus = statusFilter === "all" || approval.status.toLowerCase() === statusFilter;
    const matchesRep = repFilter === "all" || approval.rep === repFilter;

    return matchesSearch && matchesRisk && matchesStatus && matchesRep;
  });

  const pendingCount = filteredApprovals.filter(a => a.status === "Pending").length;

  return (
    <div>
      <PageHeader 
        title="Approval Queue" 
        description={`${pendingCount} quotations awaiting your review`}
        actions={
          <ViewToggle view={view} onViewChange={setView} />
        }
      />

      {/* Filters */}
      <div className="mb-4 flex flex-wrap items-end gap-3 rounded-xl border border-blue-100 bg-white p-4 shadow-sm">
        <div className="w-56">
          <Input
            placeholder="Search by ID, customer, or rep..."
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
        <div className="w-44">
          <Select
            label="Sales Rep"
            options={[
              { value: "all", label: "All Reps" },
              { value: "Priya Shah", label: "Priya Shah" },
              { value: "Marcus Lee", label: "Marcus Lee" },
              { value: "Dana Okafor", label: "Dana Okafor" },
            ]}
            value={repFilter}
            onChange={(e) => setRepFilter(e.target.value)}
          />
        </div>
        <button
          onClick={() => {
            setSearchQuery("");
            setRiskFilter("all");
            setStatusFilter("all");
            setRepFilter("all");
          }}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
        >
          Reset
        </button>
      </div>

      {/* Results */}
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