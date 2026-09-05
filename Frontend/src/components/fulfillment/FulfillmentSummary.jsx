import FulfillmentStatus from "../sales/FulfillmentStatus";
import { formatCurrency } from "../../utils/formatCurrency";

export default function FulfillmentSummary({ order }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-royal-100 bg-white p-4">
      <FulfillmentStatus status={order.fulfillmentStatus} shipmentCount={order.shipmentCount} />
      <div className="text-right">
        <p className="text-xs text-royal-400">Order total</p>
        <p className="font-display font-semibold text-royal-900">
          {formatCurrency(order.total)}
        </p>
      </div>
    </div>
  );
}
