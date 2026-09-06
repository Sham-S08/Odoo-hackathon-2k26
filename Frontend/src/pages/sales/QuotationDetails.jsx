import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PageHeader from "../../components/layout/PageHeader";
import Card from "../../components/common/Card";
import ApprovalStatus from "../../components/sales/ApprovalStatus";
import FulfillmentStatus from "../../components/sales/FulfillmentStatus";
import DealHealthCard from "../../components/ai/DealHealthCard";
import { formatCurrency } from "../../utils/formatCurrency";
import { quotationsApi } from "../../api/quotations.api";

export default function QuotationDetails() {
  const { id } = useParams();
  const [quotation, setQuotation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    quotationsApi.get(id).then((response) => setQuotation(response.data)).catch((requestError) => setError(requestError.message || "Could not load quotation"));
  }, [id]);

  if (error) return <p className="rounded-lg bg-rose-50 p-4 text-sm text-rose-700">{error}</p>;
  if (!quotation) return <p className="text-sm text-slate-500">Loading quotation...</p>;

  const approvalSteps = (quotation.approvals || []).map((approval) => ({
    name: approval.approverRole === "FINANCE_MANAGER" ? "Finance review" : "Sales Manager review",
    status: approval.status.toLowerCase(),
    note: approval.reason || undefined,
  }));
  const health = quotation.dealHealth?.[0];

  return (
    <div>
      <PageHeader
        title={`Quotation ${quotation.id}`}
        description={`${quotation.customerName} · ${formatCurrency(quotation.total)}`}
      />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <Card title="Approval progress">
            <ApprovalStatus steps={approvalSteps} />
          </Card>
          <Card title="Fulfillment">
            <FulfillmentStatus status={quotation.salesOrder?.status || "Not fulfilled"} shipmentCount={quotation.salesOrder ? 1 : 0} />
          </Card>
        </div>
        <div className="space-y-5">
          <DealHealthCard quotation={{ ...quotation, riskLevel: health?.riskLevel, riskScore: health?.riskScore }} />
        </div>
      </div>
    </div>
  );
}
