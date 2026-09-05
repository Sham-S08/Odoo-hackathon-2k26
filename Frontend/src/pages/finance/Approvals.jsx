import PageHeader from "../../components/layout/PageHeader";

export default function Approvals() {
  return (
    <div>
      <PageHeader
        title="High-Risk Approvals"
        description="Quotations requiring Finance Manager review"
      />
      <p className="text-sm text-slate-400">No high-risk approvals pending.</p>
    </div>
  );
}