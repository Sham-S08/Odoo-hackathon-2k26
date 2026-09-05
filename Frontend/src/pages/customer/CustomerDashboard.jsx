import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/layout/PageHeader";
import RecentQuotations from "../../components/dashboard/RecentQuotations";
import Card from "../../components/common/Card";
import { SAMPLE_QUOTATIONS } from "../../utils/sampleData";

export default function CustomerDashboard() {
  const navigate = useNavigate();
  return (
    <div>
      <PageHeader title="Your quotations" description="Review, negotiate, and confirm quotes from your sales rep" />
      <Card padded={false}>
        <div className="px-5">
          <RecentQuotations
            quotations={SAMPLE_QUOTATIONS}
            onOpen={(q) => navigate(`/portal/quotations/${q.id}`)}
          />
        </div>
      </Card>
    </div>
  );
}
