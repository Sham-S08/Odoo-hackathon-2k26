import Badge from "../common/Badge";

const TONES = { Paid: "green", Pending: "amber", Overdue: "rose", Refunded: "slate" };

export default function PaymentStatus({ status }) {
  return <Badge tone={TONES[status] || "slate"}>{status}</Badge>;
}
