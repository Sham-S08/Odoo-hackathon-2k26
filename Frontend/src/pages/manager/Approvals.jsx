import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/layout/PageHeader";
import ApprovalQueue from "../../components/manager/ApprovalQueue";
import { SAMPLE_APPROVALS } from "../../utils/sampleData";

export default function Approvals() {
  const navigate = useNavigate();
  return (
    <div>
      <PageHeader title="Approvals" description="Quotations awaiting Sales Manager or Finance review" />
      <ApprovalQueue approvals={SAMPLE_APPROVALS} onOpen={(a) => navigate(`/manager/approvals/${a.id}`)} />
    </div>
  );
}
