import { PackageX } from "lucide-react";

export default function BackorderAlert({ backorder }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-rose-100 bg-rose-50 p-4">
      <PackageX className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />
      <div className="text-sm">
        <p className="font-medium text-rose-800">
          {backorder.quantity} units backordered from {backorder.warehouseName}
        </p>
        <p className="text-rose-600">
          Expected restock {backorder.expectedDate}. We'll prompt you to consolidate the
          remaining shipment once stock arrives.
        </p>
      </div>
    </div>
  );
}
