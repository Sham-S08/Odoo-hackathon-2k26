import { useState } from "react";
import { Search } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import Input from "../../components/common/Input";
import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import { MOCK_FINANCE_INVENTORY } from "../../utils/financeMockData";

export default function FinanceInventory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [warehouseFilter, setWarehouseFilter] = useState("");

  const warehouses = [...new Set(MOCK_FINANCE_INVENTORY.map((item) => item.warehouseName))];

  const filtered = MOCK_FINANCE_INVENTORY.filter((item) => {
    const matchesSearch = item.productName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesWarehouse = warehouseFilter === "" || item.warehouseName === warehouseFilter;
    return matchesSearch && matchesWarehouse;
  });

  return (
    <div>
      <PageHeader 
        title="Inventory" 
        description="Stock levels across all warehouses"
        actions={
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
            + Update Stock
          </button>
        }
      />

      <div className="mb-4 flex flex-wrap gap-3">
        <div className="w-64">
          <Input placeholder="Search products..." icon={Search} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <select
          value={warehouseFilter}
          onChange={(e) => setWarehouseFilter(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Warehouses</option>
          {warehouses.map((w) => (<option key={w} value={w}>{w}</option>))}
        </select>
      </div>

      <Card padded={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-blue-100 bg-blue-50/40">
                <th className="px-4 py-3 text-left font-medium text-slate-500">Product</th>
                <th className="px-4 py-3 text-left font-medium text-slate-500">Warehouse</th>
                <th className="px-4 py-3 text-center font-medium text-slate-500">Available</th>
                <th className="px-4 py-3 text-center font-medium text-slate-500">Reserved</th>
                <th className="px-4 py-3 text-center font-medium text-slate-500">Total</th>
                <th className="px-4 py-3 text-center font-medium text-slate-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-b border-blue-50 hover:bg-blue-50/40">
                  <td className="px-4 py-3 font-medium text-slate-700">{item.productName}</td>
                  <td className="px-4 py-3 text-slate-600">{item.warehouseName}</td>
                  <td className="px-4 py-3 text-center font-medium text-slate-700">{item.available}</td>
                  <td className="px-4 py-3 text-center text-slate-500">{item.reserved}</td>
                  <td className="px-4 py-3 text-center text-slate-600">{item.quantity}</td>
                  <td className="px-4 py-3 text-center">
                    <Badge tone={item.status === "In Stock" ? "green" : item.status === "Low Stock" ? "amber" : "rose"}>
                      {item.status}
                    </Badge>
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