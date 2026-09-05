import { PackageCheck, Truck } from "lucide-react";
import Badge from "../common/Badge";

const TONES = {
  Pending: "slate",
  "Partially Fulfilled": "amber",
  Fulfilled: "green",
  Backordered: "rose",
};

export default function FulfillmentStatus({ status, shipmentCount }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-royal-50 text-royal-600">
        {status === "Fulfilled" ? (
          <PackageCheck className="h-4 w-4" />
        ) : (
          <Truck className="h-4 w-4" />
        )}
      </div>
      <div>
        <Badge tone={TONES[status] || "slate"}>{status}</Badge>
        {shipmentCount !== undefined && (
          <p className="mt-0.5 text-xs text-royal-400">{shipmentCount} shipment(s)</p>
        )}
      </div>
    </div>
  );
}
