import Badge from "../common/Badge";
import QuotationDetails from "./QuotationDetails";

const STAGE_TONES = {
  Sent: "slate",
  "Under Negotiation": "plum",
  Confirmed: "green",
};

export default function CustomerQuotation({ quotation, children }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-semibold text-royal-900">
            Quotation {quotation.id}
          </h2>
          <p className="text-sm text-royal-400">From {quotation.company}</p>
        </div>
        <Badge tone={STAGE_TONES[quotation.status] || "slate"}>{quotation.status}</Badge>
      </div>
      <QuotationDetails quotation={quotation} />
      {children}
    </div>
  );
}
