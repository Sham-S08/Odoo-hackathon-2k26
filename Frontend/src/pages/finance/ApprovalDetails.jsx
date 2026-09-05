import PageHeader from "../../components/layout/PageHeader";
import { useParams } from "react-router-dom";

export default function ApprovalDetails() {
  const { id } = useParams();
  return (
    <div>
      <PageHeader title="Approval Review" description={`Quotation ${id}`} />
      <p className="text-sm text-slate-400">Approval details coming soon...</p>
    </div>
  );
}