import { useState } from "react";
import { Search, Calendar, DollarSign } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import Input from "../../components/common/Input";
import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import { formatCurrency } from "../../utils/formatCurrency";
import { MOCK_SUBSCRIPTION_BILLING } from "../../utils/financeMockData";

export default function Billing() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const { recurringLines, upcomingBilling } = MOCK_SUBSCRIPTION_BILLING;

  const filtered = recurringLines.filter((line) =>
    line.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <PageHeader 
        title="Billing" 
        description="Recurring billing and subscription management"
      />

      {/* Upcoming Billing Schedule */}
      <Card title="Upcoming Billing Schedule" className="mb-5">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {upcomingBilling.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between rounded-lg border border-blue-100 bg-blue-50/40 p-3">
              <div>
                <p className="text-sm font-medium text-slate-800">{item.customer}</p>
                <p className="text-xs text-slate-500 flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(item.date).toLocaleDateString()}
                </p>
              </div>
              <span className="font-semibold text-slate-800">{formatCurrency(item.amount)}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Active Subscriptions */}
      <PageHeader 
        title="Active Subscriptions" 
        description="Recurring subscription lines across all customers"
        actions={
          <Badge tone="green">{recurringLines.length} Active</Badge>
        }
      />

      <div className="mb-4 max-w-sm">
        <Input placeholder="Search by customer..." icon={Search} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </div>

      <Card padded={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-blue-100 bg-blue-50/40">
                <th className="px-4 py-3 text-left font-medium text-slate-500">Customer</th>
                <th className="px-4 py-3 text-left font-medium text-slate-500">Plan</th>
                <th className="px-4 py-3 text-center font-medium text-slate-500">Qty</th>
                <th className="px-4 py-3 text-center font-medium text-slate-500">Price</th>
                <th className="px-4 py-3 text-center font-medium text-slate-500">Cadence</th>
                <th className="px-4 py-3 text-center font-medium text-slate-500">Next Billing</th>
                <th className="px-4 py-3 text-center font-medium text-slate-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((line) => (
                <tr key={line.id} className="border-b border-blue-50 hover:bg-blue-50/40">
                  <td className="px-4 py-3 font-medium text-slate-700">{line.customerName}</td>
                  <td className="px-4 py-3 text-slate-600">{line.planName}</td>
                  <td className="px-4 py-3 text-center text-slate-600">{line.quantity}</td>
                  <td className="px-4 py-3 text-center text-slate-600">{formatCurrency(line.unitPrice)}</td>
                  <td className="px-4 py-3 text-center text-slate-500">{line.cadence}</td>
                  <td className="px-4 py-3 text-center text-slate-500">{new Date(line.nextBillingDate).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-center">
                    <Badge tone="green">Active</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}