import { useNavigate } from "react-router-dom";
import { CheckCircle2, Clock, FileText, MessageSquare } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import Card from "../../components/common/Card";
import StatCard from "../../components/dashboard/StatCard";
import { SAMPLE_CUSTOMER_QUOTATIONS } from "../../utils/sampleData";

function displayStatus(status) {
  if (status === "Approved") return "Awaiting Confirmation";
  if (status === "Confirmed") return "Confirmed";
  if (status === "Under Negotiation") return "Under Negotiation";
  if (status === "Pending Approval") return "Under Review";
  return status || "Quotation";
}

function getStatusColor(status) {
  if (status === "Approved") return "bg-purple-100 text-purple-700";
  if (status === "Confirmed") return "bg-emerald-100 text-emerald-700";
  if (status === "Under Negotiation") return "bg-amber-100 text-amber-700";
  if (status === "Pending Approval") return "bg-blue-100 text-blue-700";
  return "bg-blue-100 text-blue-700";
}

function getStatusIcon(status) {
  if (status === "Approved") return Clock;
  if (status === "Confirmed") return CheckCircle2;
  if (status === "Under Negotiation") return MessageSquare;
  return FileText;
}

export default function CustomerDashboard() {
  const navigate = useNavigate();

  const active = SAMPLE_CUSTOMER_QUOTATIONS.filter((q) => 
    ["Draft", "Pending Approval"].includes(q.stage)
  ).length;
  const negotiation = SAMPLE_CUSTOMER_QUOTATIONS.filter((q) => 
    q.stage === "Under Negotiation"
  ).length;
  const awaiting = SAMPLE_CUSTOMER_QUOTATIONS.filter((q) => 
    q.stage === "Approved"
  ).length;
  const confirmed = SAMPLE_CUSTOMER_QUOTATIONS.filter((q) => 
    q.stage === "Confirmed"
  ).length;

  console.log("Customer Quotations:", SAMPLE_CUSTOMER_QUOTATIONS);
  console.log("Stats:", { active, negotiation, awaiting, confirmed });

  return (
    <div>
      <PageHeader 
        title="Customer Dashboard" 
        description="Review and manage your quotations" 
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active" value={active} icon={FileText} tone="blue" />
        <StatCard label="Under Negotiation" value={negotiation} icon={MessageSquare} tone="amber" />
        <StatCard label="Awaiting Confirmation" value={awaiting} icon={Clock} tone="purple" />
        <StatCard label="Confirmed" value={confirmed} icon={CheckCircle2} tone="green" />
      </div>

      <Card 
        title="Recent Quotations" 
        action={
          <button 
            onClick={() => navigate("/portal/quotations")} 
            className="text-sm text-blue-600 hover:underline"
          >
            View all →
          </button>
        }
      >
        {SAMPLE_CUSTOMER_QUOTATIONS.length === 0 ? (
          <p className="text-sm text-slate-500">No quotations available.</p>
        ) : (
          <div className="space-y-3">
            {SAMPLE_CUSTOMER_QUOTATIONS.slice(0, 5).map((quotation) => {
              const Icon = getStatusIcon(quotation.stage);
              const label = displayStatus(quotation.stage);
              const color = getStatusColor(quotation.stage);
              return (
                <button
                  key={quotation.id}
                  onClick={() => navigate(`/portal/quotations/${quotation.id}`)}
                  className="flex w-full items-center justify-between rounded-xl border border-blue-100 p-4 text-left hover:bg-blue-50/40 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`rounded-lg p-2 ${color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">{quotation.id}</p>
                      <p className="text-sm text-slate-500">
                        ${quotation.total.toLocaleString()} · {quotation.items || 0} items
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${color}`}>
                      {label}
                    </span>
                    <p className="mt-1 text-xs text-slate-400">v{quotation.versionNumber || 1}</p>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}