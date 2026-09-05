import { Boxes, ShieldCheck, Users, Warehouse } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import StatCard from "../../components/dashboard/StatCard";
import DealHealthChart from "../../components/dashboard/DealHealthChart";
import Card from "../../components/common/Card";
import { SAMPLE_DEAL_HEALTH_TREND, SAMPLE_PRODUCTS, SAMPLE_USERS, SAMPLE_WAREHOUSES } from "../../utils/sampleData";

export default function AdminDashboard() {
  return (
    <div>
      <PageHeader title="Backend configuration" description="Company-wide setup and platform analytics" />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-4">
        <StatCard label="Users" value={SAMPLE_USERS.length} icon={Users} tone="royal" />
        <StatCard label="Products" value={SAMPLE_PRODUCTS.length} icon={Boxes} tone="plum" />
        <StatCard label="Warehouses" value={SAMPLE_WAREHOUSES.length} icon={Warehouse} tone="emerald" />
        <StatCard label="Discount rules" value="6" icon={ShieldCheck} tone="amber" />
      </div>

      <Card title="Quotations flagged for review, by week">
        <DealHealthChart data={SAMPLE_DEAL_HEALTH_TREND} />
      </Card>
    </div>
  );
}
