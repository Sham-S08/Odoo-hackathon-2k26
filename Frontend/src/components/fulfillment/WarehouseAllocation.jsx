import { Warehouse } from "lucide-react";

export default function WarehouseAllocation({ allocation }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-royal-100 bg-white p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-royal-50 text-royal-600">
          <Warehouse className="h-4.5 w-4.5" />
        </div>
        <div>
          <p className="text-sm font-medium text-royal-900">{allocation.warehouseName}</p>
          <p className="text-xs text-royal-400">{allocation.quantity} units</p>
        </div>
      </div>
      <div className="text-right text-xs text-royal-400">
        <p>{allocation.shipments} shipment(s)</p>
        <p>${allocation.estimatedCost} est. cost</p>
      </div>
    </div>
  );
}
