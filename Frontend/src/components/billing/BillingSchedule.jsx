import { CalendarClock } from "lucide-react";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";

export default function BillingSchedule({ schedule = [] }) {
  return (
    <div className="space-y-2">
      {schedule.map((entry, idx) => (
        <div
          key={idx}
          className="flex items-center justify-between rounded-lg border border-royal-100 bg-white px-4 py-3"
        >
          <div className="flex items-center gap-2 text-sm text-royal-700">
            <CalendarClock className="h-4 w-4 text-royal-300" />
            {formatDate(entry.billingDate)}
          </div>
          <span className="text-sm font-medium text-royal-900">
            {formatCurrency(entry.amount)}
          </span>
        </div>
      ))}
    </div>
  );
}
