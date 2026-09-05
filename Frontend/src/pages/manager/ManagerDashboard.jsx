import { AlertTriangle, ShieldCheck, TrendingDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/layout/PageHeader";
import StatCard from "../../components/dashboard/StatCard";
import StalledDeals from "../../components/dashboard/StalledDeals";
import DiscountAnomalies from "../../components/dashboard/DiscountAnomalies";
import Card from "../../components/common/Card";
import { SAMPLE_APPROVALS, SAMPLE_DISCOUNT_ANOMALIES, SAMPLE_STALLED_DEALS } from "../../utils/sampleData";

export default function ManagerDashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <PageHeader title="Deal health & anomalies" description="Catch stalled or risky deals before they lose momentum" />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Pending approvals" value={SAMPLE_APPROVALS.length} icon={ShieldCheck} tone="amber" />
        <StatCard label="Stalled deals" value={SAMPLE_STALLED_DEALS.length} icon={AlertTriangle} tone="royal" />
        <StatCard label="Discount anomalies" value={SAMPLE_DISCOUNT_ANOMALIES.length} icon={TrendingDown} tone="plum" />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card title="Stalled deals">
          <StalledDeals deals={SAMPLE_STALLED_DEALS} onOpen={(d) => navigate(`/manager/approvals/${d.id}`)} />
        </Card>
        <Card title="Discount anomalies">
          <DiscountAnomalies anomalies={SAMPLE_DISCOUNT_ANOMALIES} onOpen={(a) => navigate(`/manager/approvals/${a.quotationId}`)} />
        </Card>
      </div>
    </div>
  );
}
