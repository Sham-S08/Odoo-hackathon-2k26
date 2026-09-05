import { Boxes, ShieldCheck, Users, Warehouse, AlertTriangle, ShoppingBag, FileText, CreditCard } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import StatCard from "../../components/dashboard/StatCard";
import Card from "../../components/common/Card";
import { SAMPLE_DEAL_HEALTH_TREND, SAMPLE_PRODUCTS, SAMPLE_USERS, SAMPLE_WAREHOUSES } from "../../utils/sampleData";

export default function AdminDashboard() {
  return (
    <div>
      <PageHeader 
        title="Admin Dashboard" 
        description="Company-wide configuration, governance rules, and operational overview" 
      />

      {/* KPI Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          label="Total Products" 
          value={SAMPLE_PRODUCTS.length} 
          icon={Boxes} 
          tone="blue" 
        />
        <StatCard 
          label="Total Customers" 
          value="24" 
          icon={Users} 
          tone="slate" 
        />
        <StatCard 
          label="Active Users" 
          value={SAMPLE_USERS.length} 
          icon={Users} 
          tone="green" 
        />
        <StatCard 
          label="Pending Approvals" 
          value="3" 
          icon={ShieldCheck} 
          tone="amber" 
        />
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          label="Low Stock Products" 
          value="2" 
          icon={AlertTriangle} 
          tone="amber" 
        />
        <StatCard 
          label="Active Subscription Plans" 
          value="4" 
          icon={CreditCard} 
          tone="blue" 
        />
        <StatCard 
          label="At-Risk Deals" 
          value="5" 
          icon={AlertTriangle} 
          tone="rose" 
        />
        <StatCard 
          label="Open Negotiations" 
          value="7" 
          icon={ShoppingBag} 
          tone="purple" 
        />
      </div>

      {/* Approval Overview */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card title="Approval Overview" className="lg:col-span-2">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-lg bg-blue-50/60 p-4 text-center">
              <p className="text-2xl font-semibold text-blue-600">3</p>
              <p className="text-xs text-slate-500">Pending Manager</p>
            </div>
            <div className="rounded-lg bg-purple-50/60 p-4 text-center">
              <p className="text-2xl font-semibold text-purple-600">1</p>
              <p className="text-xs text-slate-500">Pending Finance</p>
            </div>
            <div className="rounded-lg bg-emerald-50/60 p-4 text-center">
              <p className="text-2xl font-semibold text-emerald-600">12</p>
              <p className="text-xs text-slate-500">Approved</p>
            </div>
            <div className="rounded-lg bg-rose-50/60 p-4 text-center">
              <p className="text-2xl font-semibold text-rose-600">2</p>
              <p className="text-xs text-slate-500">Rejected</p>
            </div>
          </div>
        </Card>

        <Card title="Deal Health">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Low Risk</span>
              <span className="font-medium text-emerald-600">8</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Medium Risk</span>
              <span className="font-medium text-amber-600">4</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">High Risk</span>
              <span className="font-medium text-rose-600">2</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Critical Risk</span>
              <span className="font-medium text-rose-700">1</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card title="Recent Activity" className="mt-5">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between border-b border-blue-50 pb-2">
            <span><span className="font-medium">Priya Shah</span> created product <span className="text-blue-600">ProBook Laptop</span></span>
            <span className="text-xs text-slate-400">2 min ago</span>
          </div>
          <div className="flex justify-between border-b border-blue-50 pb-2">
            <span><span className="font-medium">Dana Okafor</span> updated discount rule <span className="text-blue-600">Gold → Hardware</span></span>
            <span className="text-xs text-slate-400">15 min ago</span>
          </div>
          <div className="flex justify-between border-b border-blue-50 pb-2">
            <span><span className="font-medium">Rahul Sharma</span> added warehouse <span className="text-blue-600">East Depot</span></span>
            <span className="text-xs text-slate-400">1 hour ago</span>
          </div>
          <div className="flex justify-between">
            <span><span className="font-medium">Marcus Lee</span> created user <span className="text-blue-600">Sarah Chen</span></span>
            <span className="text-xs text-slate-400">3 hours ago</span>
          </div>
        </div>
      </Card>
    </div>
  );
}