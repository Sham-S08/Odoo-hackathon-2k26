import { useNavigate } from "react-router-dom";
import { FilePlus2, HandCoins, ShoppingBag, TrendingUp } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import StatCard from "../../components/dashboard/StatCard";
import SalesChart from "../../components/dashboard/SalesChart";
import RecentQuotations from "../../components/dashboard/RecentQuotations";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import { formatCurrency } from "../../utils/formatCurrency";
import { MOCK_SALES_DASHBOARD } from "../../utils/salesMockData";

export default function SalesDashboard() {
  const navigate = useNavigate();
  const { stats, salesTrend, recentQuotations } = MOCK_SALES_DASHBOARD;

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
        <StatCard 
          label="Open pipeline value" 
          value={formatCurrency(stats.pipelineValue)} 
          change={8.4} 
          icon={HandCoins} 
          tone="blue" 
        />
        <StatCard 
          label="Active quotations" 
          value={stats.activeQuotations} 
          change={2} 
          icon={ShoppingBag} 
          tone="purple" 
        />
        <StatCard 
          label="Approved quotations" 
          value={stats.approvedQuotations} 
          change={-3} 
          icon={TrendingUp} 
          tone="green" 
        />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card title="Sales this week" className="lg:col-span-2">
          <SalesChart data={salesTrend} />
        </Card>
        <Card title="Recent quotations" padded={false}>
          <div className="px-5">
            <RecentQuotations 
              quotations={recentQuotations} 
              onOpen={(q) => navigate(`/sales/quotations/${q.id}`)} 
            />
          </div>
        </Card>
      </div>
    </div>
  );
}