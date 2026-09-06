import { useState } from "react";
import { Check, RotateCcw, X, CheckCircle2, XCircle } from "lucide-react";
import Button from "../common/Button";
import Modal from "../common/Modal";

export default function ApprovalActions({ onDecision, quotationId, currentStatus }) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [action, setAction] = useState(null);
  const [reason, setReason] = useState("");
  const [instructions, setInstructions] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // If already approved
  if (currentStatus === "Approved") {
    return (
      <div className="rounded-lg bg-emerald-50 p-4 text-center border border-emerald-200">
        <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-500" />
        <p className="mt-2 font-medium text-emerald-700">Already Approved</p>
        <p className="text-sm text-emerald-600">This quotation has been approved.</p>
      </div>
    );
  }

  // If already rejected
  if (currentStatus === "Rejected") {
    return (
      <div className="rounded-lg bg-rose-50 p-4 text-center border border-rose-200">
        <XCircle className="mx-auto h-8 w-8 text-rose-500" />
        <p className="mt-2 font-medium text-rose-700">Already Rejected</p>
        <p className="text-sm text-rose-600">This quotation has been rejected.</p>
      </div>
    );
  }

  const handleAction = (type) => {
    setAction(type);
    setShowConfirmModal(true);
  };

  const confirmAction = async () => {
    setIsProcessing(true);
    try {
      await onDecision?.(action, action === "reject" ? reason : instructions);
      setShowConfirmModal(false);
      setAction(null);
      setReason("");
      setInstructions("");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <div className="space-y-3">
        <p className="text-sm font-medium text-slate-700">Decision</p>
        <div className="grid grid-cols-1 gap-2">
          <Button 
            variant="primary" 
            icon={Check} 
            className="w-full"
            onClick={() => handleAction("approve")}
          >
            Approve
          </Button>
          <Button 
            variant="secondary" 
            icon={RotateCcw} 
            className="w-full"
            onClick={() => handleAction("revise")}
          >
            Return for Revision
          </Button>
          <Button 
            variant="danger" 
            icon={X} 
            className="w-full"
            onClick={() => handleAction("reject")}
          >
            Reject
          </Button>
        </div>
        <p className="text-[11px] text-slate-400">
          ⚠️ All actions will be logged to the audit trail.
        </p>
      </div>

      {/* Confirmation Modal */}
      <Modal
        open={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title={`Confirm ${action === "approve" ? "Approval" : action === "reject" ? "Rejection" : "Revision"}`}
        size="md"
      >
        <div className="space-y-4">
          <div className={`rounded-lg p-3 text-sm ${
            action === "approve" ? "bg-emerald-50 text-emerald-700" :
            action === "reject" ? "bg-rose-50 text-rose-700" :
            "bg-blue-50 text-blue-700"
          }`}>
            <p className="font-medium">
              {action === "approve" && "✅ Approve this quotation and continue the workflow."}
              {action === "reject" && "❌ Reject this quotation. A reason is required."}
              {action === "revise" && "🔄 Return this quotation to the sales rep for revision."}
            </p>
            <p className="mt-1 text-xs opacity-75">
              Quotation: {quotationId}
            </p>
          </div>

          {action === "reject" && (
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Rejection Reason <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Explain why this quotation is being rejected..."
                className="w-full rounded-lg border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          )}

          {action === "revise" && (
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Revision Instructions <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={3}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="What changes are needed before re-submission?"
                className="w-full rounded-lg border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
              Cancel
            </Button>
            <Button 
              variant={action === "reject" ? "danger" : "primary"} 
              onClick={confirmAction}
              loading={isProcessing}
              disabled={action === "reject" ? !reason : action === "revise" ? !instructions : false}
            >
              {isProcessing ? "Processing..." : `Confirm ${action === "approve" ? "Approval" : action === "reject" ? "Rejection" : "Revision"}`}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}