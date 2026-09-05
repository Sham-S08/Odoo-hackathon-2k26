import { useParams } from "react-router-dom";
import PageHeader from "../../components/layout/PageHeader";
import Card from "../../components/common/Card";
import ApprovalStatus from "../../components/sales/ApprovalStatus";
import FulfillmentStatus from "../../components/sales/FulfillmentStatus";
import DealHealthCard from "../../components/ai/DealHealthCard";
import { SAMPLE_QUOTATIONS } from "../../utils/sampleData";
import { formatCurrency } from "../../utils/formatCurrency";

const APPROVAL_STEPS = [
  { name: "Sales Manager review", status: "approved", note: "Approved by Dana Okafor" },
  { name: "Finance review", status: "pending" },
];

export default function QuotationDetails() {
  const { id } = useParams();
  const quotation = SAMPLE_QUOTATIONS.find((q) => q.id === id) || SAMPLE_QUOTATIONS[0];

  return (
    <div>
      <PageHeader
        title={`Quotation ${quotation.id}`}
        description={`${quotation.customerName} · ${formatCurrency(quotation.total)}`}
      />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <Card title="Approval progress">
            <ApprovalStatus steps={APPROVAL_STEPS} />
          </Card>
          <Card title="Fulfillment">
            <FulfillmentStatus status="Partially Fulfilled" shipmentCount={2} />
          </Card>
        </div>
        <div className="space-y-5">
          <DealHealthCard quotation={quotation} />
        </div>
      </div>
    </div>
  );
}
