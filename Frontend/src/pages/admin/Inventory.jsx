import { useState } from "react";
import { Search } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import Input from "../../components/common/Input";
import InventoryTable from "../../components/admin/InventoryTable";
import { SAMPLE_INVENTORY } from "../../utils/sampleData";

export default function Inventory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [warehouseFilter, setWarehouseFilter] = useState("");

  const filteredInventory = SAMPLE_INVENTORY.filter((item) => {
    const matchesSearch = item.productName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesWarehouse = warehouseFilter === "" || item.warehouseName === warehouseFilter;
    return matchesSearch && matchesWarehouse;
  });

  const warehouses = [...new Set(SAMPLE_INVENTORY.map((item) => item.warehouseName))];

  return (
    <div>
      <PageHeader
        title="Inventory"
        description="Live stock levels by product and warehouse. Manage stock availability."
      />

      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-3">
        <div className="w-64">
          <Input
            placeholder="Search products..."
            icon={Search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select
          value={warehouseFilter}
          onChange={(e) => setWarehouseFilter(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Warehouses</option>
          {warehouses.map((w) => (
            <option key={w} value={w}>{w}</option>
          ))}
        </select>
      </div>

      <InventoryTable inventory={filteredInventory} />
    </div>
  );
}