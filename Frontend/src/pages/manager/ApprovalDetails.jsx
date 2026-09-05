import { useParams } from "react-router-dom";
import PageHeader from "../../components/layout/PageHeader";
import ApprovalDetailsCard from "../../components/manager/ApprovalDetails";
import AuditTrail from "../../components/manager/AuditTrail";
import Card from "../../components/common/Card";
import { useNotification } from "../../context/NotificationContext";
import { SAMPLE_APPROVALS } from "../../utils/sampleData";

const AUDIT_ENTRIES = [
  { user: "Priya Shah", action: "submitted the quotation for approval", timestamp: "2026-08-27T10:00:00Z" },
];

export default function ApprovalDetails() {
  const { id } = useParams();
  const { notify } = useNotification();
  const approval = SAMPLE_APPROVALS.find((a) => a.id === id) || SAMPLE_APPROVALS[0];

  function handleDecision(action, reason) {
    const messages = {
      approve: "Quotation approved and logged to the audit trail",
      revise: "Sent back to the rep for revision",
      reject: "Quotation rejected",
    };
    notify(messages[action], action === "reject" ? "error" : "success");
  }

  return (
    <div>
      <PageHeader title={`Review ${approval.id}`} description={`${approval.customerName} · requested by ${approval.rep}`} />
      <div className="space-y-5">
        <ApprovalDetailsCard approval={approval} onDecision={handleDecision} />
        <Card title="Audit trail">
          <AuditTrail entries={AUDIT_ENTRIES} />
        </Card>
      </div>
    </div>
  );
}
