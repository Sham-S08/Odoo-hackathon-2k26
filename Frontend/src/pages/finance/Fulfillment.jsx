import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Truck, Package, Clock, CheckCircle2 } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import Input from "../../components/common/Input";
import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import { formatCurrency } from "../../utils/formatCurrency";
import { MOCK_FULFILLMENT } from "../../utils/financeMockData";

const STATUS_TONES = {
  "Pending Allocation": "amber",
  "Partially Fulfilled": "blue",
  "Fulfilled": "green"
};

const STATUS_ICONS = {
  "Pending Allocation": Clock,
  "Partially Fulfilled": Package,
  "Fulfilled": CheckCircle2
};

export default function Fulfillment() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = MOCK_FULFILLMENT.filter((f) =>
    f.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <PageHeader 
        title="Fulfillment" 
        description="Warehouse allocation and order fulfillment"
        actions={
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
            + New Allocation
          </button>
        }
      />

      <div className="mb-4 max-w-sm">
        <Input placeholder="Search by order ID or customer..." icon={Search} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filtered.map((order) => {
          const Icon = STATUS_ICONS[order.status] || Package;
          return (
            <button
              key={order.id}
              onClick={() => navigate(`/finance/fulfillment/${order.id}`)}
              className="flex w-full items-center justify-between rounded-xl border border-blue-100 bg-white p-4 text-left hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className={`rounded-lg p-2 ${
                  order.status === "Pending Allocation" ? "bg-amber-100 text-amber-600" :
                  order.status === "Partially Fulfilled" ? "bg-blue-100 text-blue-600" :
                  "bg-emerald-100 text-emerald-600"
                }`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-slate-800">{order.id}</p>
                  <p className="text-sm text-slate-500">{order.customerName}</p>
                  <p className="text-xs text-slate-400">{order.items.length} items</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-slate-800">{formatCurrency(order.total)}</p>
                <Badge tone={STATUS_TONES[order.status] || "slate"}>{order.status}</Badge>
                <p className="mt-1 text-xs text-slate-400">{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}