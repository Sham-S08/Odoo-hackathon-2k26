import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/layout/PageHeader";
import QuotationTable from "../../components/sales/QuotationTable";
import { SAMPLE_QUOTATIONS } from "../../utils/sampleData";

export default function CustomerQuotations() {
  const navigate = useNavigate();
  return (
    <div>
      <PageHeader title="My quotations" description="All quotes shared with you" />
      <QuotationTable quotations={SAMPLE_QUOTATIONS} onOpen={(q) => navigate(`/portal/quotations/${q.id}`)} />
    </div>
  );
}
