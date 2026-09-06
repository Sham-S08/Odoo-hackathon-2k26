import { FilePlus2, HandCoins, ShoppingBag, TrendingUp } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import StatCard from "../../components/dashboard/StatCard";
import SalesChart from "../../components/dashboard/SalesChart";
import RecentQuotations from "../../components/dashboard/RecentQuotations";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import { useNavigate } from "react-router-dom";
import { useQuotations } from "../../hooks/useQuotations";
import { formatCurrency } from "../../utils/formatCurrency";

export default function SalesDashboard() {
  const navigate = useNavigate();
  const { quotations } = useQuotations();
  const pipelineQuotations = quotations.filter((q) => !["COMPLETED", "CANCELLED"].includes(q.status));
  const pipelineValue = pipelineQuotations.reduce((sum, q) => sum + Number(q.total || 0), 0);

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
        <StatCard label="Active quotations" value={pipelineQuotations.length} icon={ShoppingBag} tone="plum" />
        <StatCard label="Approved quotations" value={quotations.filter((q) => q.status === "APPROVED").length} icon={TrendingUp} tone="emerald" />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card title="Sales this week" className="lg:col-span-2">
          <p className="text-sm text-royal-500">Live pipeline value: {formatCurrency(pipelineValue)}</p>
        </Card>
        <Card title="Recent quotations" padded={false}>
          <div className="px-5">
            <RecentQuotations quotations={quotations.slice(0, 5).map((quotation) => ({ ...quotation, customerName: quotation.customer?.name, total: Number(quotation.total) }))} onOpen={(q) => navigate(`/sales/quotations/${q.id}`)} />
          </div>
        </Card>
      </div>
    </div>
  );
}
