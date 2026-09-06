import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, AlertTriangle, CheckCircle2, Clock, XCircle } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";
import RiskScore from "../../components/manager/RiskScore";
import ApprovalChain from "../../components/manager/ApprovalChain";
import AuditTrail from "../../components/manager/AuditTrail";
import RuleViolationCard from "../../components/manager/RuleViolationCard";
import VersionComparison from "../../components/manager/VersionComparison";
import ApprovalActions from "../../components/manager/ApprovalActions";
import { formatCurrency } from "../../utils/formatCurrency";
import { MOCK_APPROVAL_DETAIL } from "../../utils/managerMockData";
import { useNotification } from "../../context/NotificationContext";

export default function ApprovalDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { notify } = useNotification();
  const [showComparison, setShowComparison] = useState(false);
  const [approval, setApproval] = useState(MOCK_APPROVAL_DETAIL);

  const handleDecision = (action, reason) => {
    const status = action === "approve" ? "Approved" : "Rejected";
    const newAuditEntry = {
      user: "You (Manager)",
      action: `${action} the quotation${reason ? `: ${reason}` : ""}`,
      timestamp: new Date().toISOString()
    };

    setApproval({
      ...approval,
      status: status,
      auditTrail: [...approval.auditTrail, newAuditEntry],
      approvedBy: action === "approve" ? "You" : undefined,
      rejectedBy: action === "reject" ? "You" : undefined,
      approvedAt: action === "approve" ? new Date().toISOString() : undefined,
      rejectedAt: action === "reject" ? new Date().toISOString() : undefined,
      rejectionReason: action === "reject" ? reason : undefined,
      approvalChain: approval.approvalChain.map(step => {
        if (step.status === "current") {
          return { 
            ...step, 
            status: action === "approve" ? "completed" : "rejected",
            timestamp: new Date().toISOString(),
            user: "You",
            note: action === "reject" ? `Rejected: ${reason}` : undefined
          };
        }
        return step;
      })
    });

    notify(`Quotation ${action === "approve" ? "approved" : "rejected"} successfully`, action === "approve" ? "success" : "error");
  };

  const isApproved = approval.status === "Approved";
  const isRejected = approval.status === "Rejected";
  const isPending = approval.status === "Pending";

  return (
    <div>
      <PageHeader 
        title={`Review Quotation ${approval.id}`}
        description={`${approval.customerName} · ${approval.customerTier} tier · requested by ${approval.rep}`}
        actions={
          <Button variant="secondary" icon={ArrowLeft} onClick={() => navigate("/manager/approvals")}>
            Back to Queue
          </Button>
        }
      />

      {isApproved && (
        <div className="mb-4 rounded-xl bg-emerald-50 border border-emerald-200 p-4 flex items-center gap-3">
          <CheckCircle2 className="h-6 w-6 text-emerald-500" />
          <div>
            <p className="font-medium text-emerald-700">Quotation Approved</p>
            <p className="text-sm text-emerald-600">Approved on {new Date(approval.approvedAt).toLocaleString()}</p>
          </div>
        </div>
      )}

      {isRejected && (
        <div className="mb-4 rounded-xl bg-rose-50 border border-rose-200 p-4 flex items-start gap-3">
          <XCircle className="h-6 w-6 text-rose-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-rose-700">Quotation Rejected</p>
            <p className="text-sm text-rose-600">Rejected on {new Date(approval.rejectedAt).toLocaleString()}</p>
            {approval.rejectionReason && (
              <p className="mt-1 text-sm text-rose-700 bg-rose-100/60 p-2 rounded-lg">Reason: {approval.rejectionReason}</p>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <Card title="Quotation Summary">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div><p className="text-xs text-slate-400">Customer</p><p className="text-sm font-medium text-slate-800">{approval.customerName}</p></div>
              <div><p className="text-xs text-slate-400">Sales Rep</p><p className="text-sm font-medium text-slate-800">{approval.rep}</p></div>
              <div><p className="text-xs text-slate-400">Total Amount</p><p className="text-sm font-medium text-slate-800">{formatCurrency(approval.total)}</p></div>
              <div><p className="text-xs text-slate-400">Status</p><Badge tone={isApproved ? "green" : isRejected ? "rose" : "amber"}>{approval.status}</Badge></div>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-blue-100">
                    <th className="px-3 py-2 text-left font-medium text-slate-500">Product</th>
                    <th className="px-3 py-2 text-left font-medium text-slate-500">Category</th>
                    <th className="px-3 py-2 text-right font-medium text-slate-500">Price</th>
                    <th className="px-3 py-2 text-right font-medium text-slate-500">Discount</th>
                    <th className="px-3 py-2 text-right font-medium text-slate-500">Allowed</th>
                    <th className="px-3 py-2 text-right font-medium text-slate-500">Variance</th>
                  </tr>
                </thead>
                <tbody>
                  {approval.items.map((item, idx) => (
                    <tr key={idx} className="border-b border-blue-50 last:border-0">
                      <td className="px-3 py-2 text-slate-700">{item.product}</td>
                      <td className="px-3 py-2 text-slate-500">{item.category}</td>
                      <td className="px-3 py-2 text-right text-slate-600">{formatCurrency(item.basePrice)}</td>
                      <td className={`px-3 py-2 text-right font-medium ${item.variance > 0 ? "text-rose-600" : "text-emerald-600"}`}>{item.discount}%</td>
                      <td className="px-3 py-2 text-right text-slate-500">{item.allowed}%</td>
                      <td className={`px-3 py-2 text-right font-medium ${item.variance > 0 ? "text-rose-600" : "text-emerald-600"}`}>{item.variance > 0 ? `+${item.variance}%` : "✓"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card title="Rule Violations">
            {approval.violations.map((v, idx) => (
              <RuleViolationCard key={idx} violation={v} />
            ))}
          </Card>

          <Card title="Version Comparison" action={
            <Button variant="secondary" size="sm" onClick={() => setShowComparison(!showComparison)}>
              {showComparison ? "Hide" : "Show"} Comparison
            </Button>
          }>
            {showComparison ? <VersionComparison previous={approval.previousVersion} current={approval.currentVersion} /> : <p className="text-sm text-slate-400">Click "Show Comparison" to see changes.</p>}
          </Card>

          <Card title="Approval Chain"><ApprovalChain steps={approval.approvalChain} /></Card>
          <Card title="Audit Trail"><AuditTrail entries={approval.auditTrail} /></Card>
        </div>

        <div className="space-y-5">
          <Card title="Risk Assessment">
            <RiskScore 
              score={approval.riskScore} 
              level={approval.riskLevel}
              reasons={[
                "Service discount exceeds category ceiling (18% vs 10%)",
                "Multiple line-level discount violations detected"
              ]}
            />
          </Card>

          {isPending && (
            <Card>
              <ApprovalActions onDecision={handleDecision} quotationId={approval.id} currentStatus={approval.status} />
            </Card>
          )}

          {(isApproved || isRejected) && (
            <Card title="Decision Summary">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-500">Status</span><Badge tone={isApproved ? "green" : "rose"}>{approval.status}</Badge></div>
                <div className="flex justify-between"><span className="text-slate-500">By</span><span className="font-medium text-slate-700">{isApproved ? approval.approvedBy : approval.rejectedBy}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Date</span><span className="text-slate-700">{isApproved ? new Date(approval.approvedAt).toLocaleString() : new Date(approval.rejectedAt).toLocaleString()}</span></div>
                {isRejected && approval.rejectionReason && (
                  <div className="mt-2 rounded-lg bg-rose-50 p-2 text-rose-700"><p className="text-xs font-medium">Reason:</p><p className="text-sm">{approval.rejectionReason}</p></div>
                )}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}