import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";
import RiskScore from "./RiskScore";
import ApprovalChain from "./ApprovalChain";
import AuditTrail from "./AuditTrail";
import RuleViolationCard from "./RuleViolationCard";
import VersionComparison from "./VersionComparison";
import ApprovalActions from "./ApprovalActions";
import { formatCurrency } from "../../utils/formatCurrency";

// SINGLE UNIFIED DATA MAP - All approvals in one place
const ALL_APPROVAL_DETAILS = {
  "quo_5001": {
    id: "quo_5001",
    customerName: "Acme Corp",
    customerTier: "Gold",
    rep: "Priya Shah",
    createdDate: "2026-09-05T10:00:00Z",
    total: 24800,
    items: [
      { product: "ProBook Laptop 14\"", category: "Hardware", basePrice: 1200, discount: 12, allowed: 15, variance: 0 },
      { product: "Setup & Onboarding Service", category: "Services", basePrice: 450, discount: 18, allowed: 10, variance: 8 },
      { product: "24/7 Support Plan", category: "Subscriptions", basePrice: 99, discount: 5, allowed: 12, variance: 0 },
    ],
    riskScore: 68,
    riskLevel: "HIGH",
    status: "Pending",
    discountTotal: 18,
    violations: [
      { rule: "Services category limit", allowed: 10, requested: 18, difference: 8, severity: "high" },
      { rule: "Gold customer tier limit", allowed: 15, requested: 18, difference: 3, severity: "medium" },
    ],
    approvalChain: [
      { step: "Sales Rep", status: "completed", user: "Priya Shah", timestamp: "2026-09-05T10:00:00Z" },
      { step: "Sales Manager", status: "current", user: "You", timestamp: null },
      { step: "Finance / Operations", status: "pending", user: null, timestamp: null },
      { step: "Customer Confirmation", status: "pending", user: null, timestamp: null },
    ],
    auditTrail: [
      { user: "Priya Shah", action: "created quotation", timestamp: "2026-09-05T10:00:00Z" },
      { user: "Priya Shah", action: "applied 18% discount to Setup Service", timestamp: "2026-09-05T10:10:00Z" },
      { user: "System", action: "rule evaluation: Services discount exceeds 10% ceiling", timestamp: "2026-09-05T10:11:00Z" },
      { user: "System", action: "deal health score generated: 68/100 (HIGH)", timestamp: "2026-09-05T10:12:00Z" },
      { user: "Priya Shah", action: "submitted for approval", timestamp: "2026-09-05T10:15:00Z" },
    ],
    previousVersion: {
      total: 23600,
      discount: 12,
      riskScore: 32,
      items: [
        { product: "ProBook Laptop 14\"", quantity: 10, discount: 10 },
        { product: "Setup & Onboarding Service", quantity: 5, discount: 12 },
      ]
    },
    currentVersion: {
      total: 24800,
      discount: 18,
      riskScore: 68,
      items: [
        { product: "ProBook Laptop 14\"", quantity: 10, discount: 12 },
        { product: "Setup & Onboarding Service", quantity: 5, discount: 18 },
        { product: "24/7 Support Plan", quantity: 5, discount: 5 },
      ]
    }
  },
  "quo_5002": {
    id: "quo_5002",
    customerName: "Beta Industries",
    customerTier: "Silver",
    rep: "Marcus Lee",
    createdDate: "2026-09-05T08:30:00Z",
    total: 9600,
    items: [
      { product: "Server Rack", category: "Hardware", basePrice: 2400, discount: 22, allowed: 10, variance: 12 },
      { product: "Installation Service", category: "Services", basePrice: 600, discount: 25, allowed: 10, variance: 15 },
      { product: "Cooling Unit", category: "Hardware", basePrice: 800, discount: 18, allowed: 10, variance: 8 },
    ],
    riskScore: 85,
    riskLevel: "CRITICAL",
    status: "Pending",
    discountTotal: 22,
    violations: [
      { rule: "Hardware category limit", allowed: 10, requested: 22, difference: 12, severity: "critical" },
      { rule: "Services category limit", allowed: 10, requested: 25, difference: 15, severity: "critical" },
      { rule: "Silver customer tier limit", allowed: 10, requested: 22, difference: 12, severity: "high" },
    ],
    approvalChain: [
      { step: "Sales Rep", status: "completed", user: "Marcus Lee", timestamp: "2026-09-05T08:30:00Z" },
      { step: "Sales Manager", status: "current", user: "You", timestamp: null },
      { step: "Finance / Operations", status: "pending", user: null, timestamp: null },
      { step: "Customer Confirmation", status: "pending", user: null, timestamp: null },
    ],
    auditTrail: [
      { user: "Marcus Lee", action: "created quotation", timestamp: "2026-09-05T08:30:00Z" },
      { user: "Marcus Lee", action: "applied 22% discount to Server Rack", timestamp: "2026-09-05T08:45:00Z" },
      { user: "System", action: "rule evaluation: Multiple violations detected", timestamp: "2026-09-05T08:46:00Z" },
      { user: "System", action: "deal health score generated: 85/100 (CRITICAL)", timestamp: "2026-09-05T08:47:00Z" },
      { user: "Marcus Lee", action: "submitted for approval", timestamp: "2026-09-05T08:50:00Z" },
    ],
    previousVersion: null,
    currentVersion: null
  },
  "quo_5003": {
    id: "quo_5003",
    customerName: "Northwind Traders",
    customerTier: "Bronze",
    rep: "Priya Shah",
    createdDate: "2026-09-04T14:00:00Z",
    total: 15200,
    items: [
      { product: "Analytics Add-on", category: "Subscriptions", basePrice: 590, discount: 15, allowed: 5, variance: 10 },
      { product: "Premium Support", category: "Subscriptions", basePrice: 250, discount: 12, allowed: 5, variance: 7 },
    ],
    riskScore: 45,
    riskLevel: "MEDIUM",
    status: "Pending",
    discountTotal: 15,
    violations: [
      { rule: "Subscriptions category limit", allowed: 5, requested: 15, difference: 10, severity: "medium" },
      { rule: "Bronze customer tier limit", allowed: 5, requested: 15, difference: 10, severity: "medium" },
    ],
    approvalChain: [
      { step: "Sales Rep", status: "completed", user: "Priya Shah", timestamp: "2026-09-04T14:00:00Z" },
      { step: "Sales Manager", status: "current", user: "You", timestamp: null },
      { step: "Finance / Operations", status: "not_required", user: null, timestamp: null },
      { step: "Customer Confirmation", status: "pending", user: null, timestamp: null },
    ],
    auditTrail: [
      { user: "Priya Shah", action: "created quotation", timestamp: "2026-09-04T14:00:00Z" },
      { user: "Priya Shah", action: "applied 15% discount to Analytics Add-on", timestamp: "2026-09-04T14:10:00Z" },
      { user: "System", action: "rule evaluation: Subscriptions discount exceeds 5% ceiling", timestamp: "2026-09-04T14:11:00Z" },
      { user: "System", action: "deal health score generated: 45/100 (MEDIUM)", timestamp: "2026-09-04T14:12:00Z" },
      { user: "Priya Shah", action: "submitted for approval", timestamp: "2026-09-04T14:15:00Z" },
    ],
    previousVersion: null,
    currentVersion: null
  },
  "quo_5006": {
    id: "quo_5006",
    customerName: "Innovation Labs",
    customerTier: "Silver",
    rep: "Dana Okafor",
    createdDate: "2026-09-01T11:00:00Z",
    total: 8200,
    items: [
      { product: "Workstation Pro", category: "Hardware", basePrice: 3200, discount: 8, allowed: 10, variance: 0 },
      { product: "Extended Warranty", category: "Services", basePrice: 300, discount: 8, allowed: 10, variance: 0 },
    ],
    riskScore: 22,
    riskLevel: "LOW",
    status: "Pending",
    discountTotal: 8,
    violations: [],
    approvalChain: [
      { step: "Sales Rep", status: "completed", user: "Dana Okafor", timestamp: "2026-09-01T11:00:00Z" },
      { step: "Sales Manager", status: "current", user: "You", timestamp: null },
      { step: "Finance / Operations", status: "not_required", user: null, timestamp: null },
      { step: "Customer Confirmation", status: "pending", user: null, timestamp: null },
    ],
    auditTrail: [
      { user: "Dana Okafor", action: "created quotation", timestamp: "2026-09-01T11:00:00Z" },
      { user: "Dana Okafor", action: "submitted for approval", timestamp: "2026-09-01T11:05:00Z" },
    ],
    previousVersion: null,
    currentVersion: null
  },
  "quo_5004": {
    id: "quo_5004",
    customerName: "Globex",
    customerTier: "Gold",
    rep: "Dana Okafor",
    createdDate: "2026-09-03T09:00:00Z",
    total: 41500,
    items: [
      { product: "Server Rack", category: "Hardware", basePrice: 2400, discount: 10, allowed: 15, variance: 0 },
      { product: "Installation Service", category: "Services", basePrice: 600, discount: 8, allowed: 10, variance: 0 },
    ],
    riskScore: 28,
    riskLevel: "LOW",
    status: "Approved",
    discountTotal: 10,
    violations: [],
    approvalChain: [
      { step: "Sales Rep", status: "completed", user: "Dana Okafor", timestamp: "2026-09-03T09:00:00Z" },
      { step: "Sales Manager", status: "completed", user: "You", timestamp: "2026-09-03T11:00:00Z" },
      { step: "Finance / Operations", status: "not_required", user: null, timestamp: null },
      { step: "Customer Confirmation", status: "pending", user: null, timestamp: null },
    ],
    auditTrail: [
      { user: "Dana Okafor", action: "created quotation", timestamp: "2026-09-03T09:00:00Z" },
      { user: "Dana Okafor", action: "submitted for approval", timestamp: "2026-09-03T09:05:00Z" },
      { user: "You", action: "approved the quotation", timestamp: "2026-09-03T11:00:00Z" },
    ],
    previousVersion: null,
    currentVersion: null,
    approvedBy: "You",
    approvedAt: "2026-09-03T11:00:00Z"
  },
  "quo_5005": {
    id: "quo_5005",
    customerName: "TechCorp",
    customerTier: "Gold",
    rep: "Marcus Lee",
    createdDate: "2026-09-02T16:00:00Z",
    total: 18400,
    items: [
      { product: "Setup Service", category: "Services", basePrice: 450, discount: 30, allowed: 10, variance: 20 },
    ],
    riskScore: 92,
    riskLevel: "CRITICAL",
    status: "Rejected",
    discountTotal: 30,
    violations: [
      { rule: "Services category limit", allowed: 10, requested: 30, difference: 20, severity: "critical" },
      { rule: "Gold customer tier limit", allowed: 15, requested: 30, difference: 15, severity: "critical" },
    ],
    approvalChain: [
      { step: "Sales Rep", status: "completed", user: "Marcus Lee", timestamp: "2026-09-02T16:00:00Z" },
      { step: "Sales Manager", status: "rejected", user: "You", timestamp: "2026-09-02T17:00:00Z" },
      { step: "Finance / Operations", status: "not_required", user: null, timestamp: null },
      { step: "Customer Confirmation", status: "pending", user: null, timestamp: null },
    ],
    auditTrail: [
      { user: "Marcus Lee", action: "created quotation", timestamp: "2026-09-02T16:00:00Z" },
      { user: "Marcus Lee", action: "submitted for approval", timestamp: "2026-09-02T16:05:00Z" },
      { user: "You", action: "rejected the quotation: Excessive discount on services (30% vs 10% ceiling)", timestamp: "2026-09-02T17:00:00Z" },
    ],
    previousVersion: null,
    currentVersion: null,
    rejectedBy: "You",
    rejectedAt: "2026-09-02T17:00:00Z",
    rejectionReason: "Excessive discount on services (30% vs 10% ceiling)"
  }
};

export default function ApprovalDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showComparison, setShowComparison] = useState(false);
  
  const approvalData = ALL_APPROVAL_DETAILS[id];
  
  if (!approvalData) {
    return (
      <div className="p-8 text-center">
        <p className="text-slate-500">Quotation not found</p>
        <Button 
          variant="primary" 
          onClick={() => navigate("/manager/approvals")}
          className="mt-4"
        >
          Back to Approvals
        </Button>
      </div>
    );
  }

  const isApproved = approvalData.status === "Approved";
  const isRejected = approvalData.status === "Rejected";
  const isPending = approvalData.status === "Pending";

  return (
    <div>
      <PageHeader 
        title={`Review Quotation ${approvalData.id}`}
        description={`${approvalData.customerName} · ${approvalData.customerTier} tier · requested by ${approvalData.rep}`}
        actions={
          <div className="flex items-center gap-2">
            {isApproved && (
              <Badge tone="green" icon={CheckCircle2}>Approved ✓</Badge>
            )}
            {isRejected && (
              <Badge tone="rose" icon={XCircle}>Rejected ✗</Badge>
            )}
            <Button 
              variant="secondary" 
              icon={ArrowLeft} 
              onClick={() => navigate("/manager/approvals")}
            >
              Back to Queue
            </Button>
          </div>
        }
      />

      {/* Status Banner */}
      {isApproved && (
        <div className="mb-4 rounded-xl bg-emerald-50 border border-emerald-200 p-4 flex items-center gap-3">
          <CheckCircle2 className="h-6 w-6 text-emerald-500" />
          <div>
            <p className="font-medium text-emerald-700">Quotation Approved</p>
            <p className="text-sm text-emerald-600">
              Approved on {approvalData.approvedAt ? new Date(approvalData.approvedAt).toLocaleString() : "just now"}
            </p>
          </div>
        </div>
      )}

      {isRejected && (
        <div className="mb-4 rounded-xl bg-rose-50 border border-rose-200 p-4 flex items-start gap-3">
          <XCircle className="h-6 w-6 text-rose-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-rose-700">Quotation Rejected</p>
            <p className="text-sm text-rose-600">
              Rejected on {approvalData.rejectedAt ? new Date(approvalData.rejectedAt).toLocaleString() : "just now"}
            </p>
            {approvalData.rejectionReason && (
              <p className="mt-1 text-sm text-rose-700 bg-rose-100/60 p-2 rounded-lg">
                Reason: {approvalData.rejectionReason}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-5 lg:col-span-2">
          {/* Quotation Summary */}
          <Card title="Quotation Summary">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div>
                <p className="text-xs text-slate-400">Customer</p>
                <p className="text-sm font-medium text-slate-800">{approvalData.customerName}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Sales Rep</p>
                <p className="text-sm font-medium text-slate-800">{approvalData.rep}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Total Amount</p>
                <p className="text-sm font-medium text-slate-800">{formatCurrency(approvalData.total)}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Status</p>
                <Badge tone={isApproved ? "green" : isRejected ? "rose" : "amber"}>
                  {approvalData.status}
                </Badge>
              </div>
            </div>

            {/* Line Items */}
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-blue-100">
                    <th className="px-3 py-2 text-left font-medium text-slate-500">Product</th>
                    <th className="px-3 py-2 text-left font-medium text-slate-500">Category</th>
                    <th className="px-3 py-2 text-right font-medium text-slate-500">Base Price</th>
                    <th className="px-3 py-2 text-right font-medium text-slate-500">Discount</th>
                    <th className="px-3 py-2 text-right font-medium text-slate-500">Allowed</th>
                    <th className="px-3 py-2 text-right font-medium text-slate-500">Variance</th>
                  </tr>
                </thead>
                <tbody>
                  {approvalData.items.map((item, idx) => (
                    <tr key={idx} className="border-b border-blue-50 last:border-0">
                      <td className="px-3 py-2 text-slate-700">{item.product}</td>
                      <td className="px-3 py-2 text-slate-500">{item.category}</td>
                      <td className="px-3 py-2 text-right text-slate-600">{formatCurrency(item.basePrice)}</td>
                      <td className={`px-3 py-2 text-right font-medium ${
                        item.variance > 0 ? "text-rose-600" : "text-emerald-600"
                      }`}>
                        {item.discount}%
                      </td>
                      <td className="px-3 py-2 text-right text-slate-500">{item.allowed}%</td>
                      <td className={`px-3 py-2 text-right font-medium ${
                        item.variance > 0 ? "text-rose-600" : "text-emerald-600"
                      }`}>
                        {item.variance > 0 ? `+${item.variance}%` : "✓"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Rule Violations */}
          {approvalData.violations && approvalData.violations.length > 0 && (
            <Card title="Rule Violations">
              {approvalData.violations.map((violation, idx) => (
                <RuleViolationCard key={idx} violation={violation} />
              ))}
            </Card>
          )}

          {/* Version Comparison */}
          {approvalData.previousVersion && (
            <Card 
              title="Version Comparison"
              action={
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={() => setShowComparison(!showComparison)}
                >
                  {showComparison ? "Hide" : "Show"} Comparison
                </Button>
              }
            >
              {showComparison ? (
                <VersionComparison 
                  previous={approvalData.previousVersion} 
                  current={approvalData.currentVersion} 
                />
              ) : (
                <p className="text-sm text-slate-400">
                  Click "Show Comparison" to see changes from the previous version.
                </p>
              )}
            </Card>
          )}

          {/* Approval Chain */}
          <Card title="Approval Chain">
            <ApprovalChain steps={approvalData.approvalChain} />
          </Card>

          {/* Audit Trail */}
          <Card title="Audit Trail">
            <AuditTrail entries={approvalData.auditTrail} />
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Risk Score */}
          <Card title="Risk Assessment">
            <RiskScore 
              score={approvalData.riskScore} 
              level={approvalData.riskLevel}
              reasons={
                approvalData.violations && approvalData.violations.length > 0
                  ? approvalData.violations.map(v => 
                      `${v.rule}: ${v.requested}% vs ${v.allowed}% allowed`
                    )
                  : ["All discounts within allowed limits"]
              }
            />
          </Card>

          {/* Actions */}
          {isPending && (
            <Card>
              <ApprovalActions 
                onDecision={(action, reason) => {
                  // Callback to parent - this will update the approvals list
                }}
                quotationId={approvalData.id}
                currentStatus={approvalData.status}
              />
            </Card>
          )}

          {/* Decision Summary */}
          {(isApproved || isRejected) && (
            <Card title="Decision Summary">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Status</span>
                  <Badge tone={isApproved ? "green" : "rose"}>
                    {approvalData.status}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">By</span>
                  <span className="font-medium text-slate-700">
                    {isApproved ? approvalData.approvedBy : approvalData.rejectedBy}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Date</span>
                  <span className="text-slate-700">
                    {isApproved 
                      ? new Date(approvalData.approvedAt).toLocaleString() 
                      : new Date(approvalData.rejectedAt).toLocaleString()}
                  </span>
                </div>
                {isRejected && approvalData.rejectionReason && (
                  <div className="mt-2 rounded-lg bg-rose-50 p-2 text-rose-700">
                    <p className="text-xs font-medium">Reason:</p>
                    <p className="text-sm">{approvalData.rejectionReason}</p>
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}