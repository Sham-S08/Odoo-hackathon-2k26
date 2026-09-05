import { useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../../components/layout/PageHeader";
import CustomerQuotation from "../../components/customer/CustomerQuotation";
import NegotiationForm from "../../components/customer/NegotiationForm";
import CommentBox from "../../components/customer/CommentBox";
import AcceptQuotation from "../../components/customer/AcceptQuotation";
import Card from "../../components/common/Card";
import { useNegotiation } from "../../hooks/useNegotiation";
import { useNotification } from "../../context/NotificationContext";

const SAMPLE_QUOTATION_DETAIL = {
  id: "quo_5003",
  company: "DealFlow360 Inc.",
  status: "Under Negotiation",
  total: 15200,
  items: [
    { productId: "prod_101", name: "ProBook Laptop 14\"", quantity: 10, unitPrice: 1200, discountPercent: 8 },
    { productId: "prod_105", name: "Extended Warranty - 3yr", quantity: 10, unitPrice: 240, discountPercent: 5 },
  ],
};

const SAMPLE_COMMENTS = [
  { author: "Priya Shah (Rep)", text: "Added the 3-year warranty per your request.", timestamp: "2026-08-28T15:00:00Z" },
];

export default function CustomerQuotationDetails() {
  const { id } = useParams();
  const { notify } = useNotification();
  const { sendRequest, sending } = useNegotiation(id);
  const [confirmed, setConfirmed] = useState(false);

  async function handleNegotiate(payload) {
    notify(
      `Requested an additional ${payload.requestedDiscountPercent}% discount`,
      "success"
    );
  }

  function handleConfirm() {
    setConfirmed(true);
    notify("Quotation confirmed — moving to fulfillment", "success");
  }

  return (
    <div>
      <PageHeader title="Quotation details" description="Review the terms and negotiate directly" />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <CustomerQuotation quotation={SAMPLE_QUOTATION_DETAIL} />
          <AcceptQuotation onConfirm={handleConfirm} disabled={confirmed} />
        </div>
        <div className="space-y-5">
          <Card title="Ask a question or counter">
            <NegotiationForm onSubmit={handleNegotiate} sending={sending} />
          </Card>
          <Card title="Conversation">
            <CommentBox comments={SAMPLE_COMMENTS} />
          </Card>
        </div>
      </div>
    </div>
  );
}
