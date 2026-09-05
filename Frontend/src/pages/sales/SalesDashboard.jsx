import { FilePlus2, HandCoins, ShoppingBag, TrendingUp } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import StatCard from "../../components/dashboard/StatCard";
import SalesChart from "../../components/dashboard/SalesChart";
import RecentQuotations from "../../components/dashboard/RecentQuotations";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import { useNavigate } from "react-router-dom";
import { SAMPLE_QUOTATIONS, SAMPLE_SALES_TREND } from "../../utils/sampleData";
import { formatCurrency } from "../../utils/formatCurrency";

export default function SalesDashboard() {
  const navigate = useNavigate();
  const pipelineValue = SAMPLE_QUOTATIONS.reduce((sum, q) => sum + q.total, 0);

  return (
    <div>
      <PageHeader
        title="Sales workspace"
        description="Your quotations, pipeline value, and recent activity"
        actions={
          <Button variant="gradient" icon={FilePlus2} onClick={() => navigate("/sales/quotations/new")}>
            New Quotation
          </Button>
        }
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Open pipeline value" value={formatCurrency(pipelineValue)} change={8.4} icon={HandCoins} tone="royal" />
        <StatCard label="Active quotations" value={SAMPLE_QUOTATIONS.length} change={2} icon={ShoppingBag} tone="plum" />
        <StatCard label="Win rate (30d)" value="42%" change={-3} icon={TrendingUp} tone="emerald" />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card title="Sales this week" className="lg:col-span-2">
          <SalesChart data={SAMPLE_SALES_TREND} />
        </Card>
        <Card title="Recent quotations" padded={false}>
          <div className="px-5">
            <RecentQuotations quotations={SAMPLE_QUOTATIONS} onOpen={(q) => navigate(`/sales/quotations/${q.id}`)} />
          </div>
        </Card>
      </div>
    </div>
  );
}
