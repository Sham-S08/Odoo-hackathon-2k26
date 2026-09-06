import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";
import ApprovalStatus from "../../components/sales/ApprovalStatus";
import FulfillmentStatus from "../../components/sales/FulfillmentStatus";
import DealHealthCard from "../../components/ai/DealHealthCard";
import { formatCurrency } from "../../utils/formatCurrency";
import { MOCK_QUOTATION_DETAIL } from "../../utils/salesMockData";

const STAGE_TONES = {
  "Draft": "blue",
  "Pending Approval": "amber",
  "Under Negotiation": "purple",
  "Approved": "green",
  "Confirmed": "emerald"
};

export default function QuotationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const quotation = MOCK_QUOTATION_DETAIL;

  return (
    <div>
      <PageHeader
        title={`Quotation ${quotation.id}`}
        description={`${quotation.customerName} · ${formatCurrency(quotation.total)}`}
        actions={
          <Button variant="secondary" icon={ArrowLeft} onClick={() => navigate("/sales/quotations")}>
            Back
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <Card title="Quotation Summary">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div>
                <p className="text-xs text-slate-400">Customer</p>
                <p className="text-sm font-medium text-slate-800">{quotation.customerName}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Tier</p>
                <p className="text-sm font-medium text-slate-800">{quotation.customerTier}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Total</p>
                <p className="text-sm font-medium text-slate-800">{formatCurrency(quotation.total)}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Status</p>
                <Badge tone={STAGE_TONES[quotation.status] || "slate"}>{quotation.status}</Badge>
              </div>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-blue-100">
                    <th className="px-3 py-2 text-left font-medium text-slate-500">Product</th>
                    <th className="px-3 py-2 text-center font-medium text-slate-500">Qty</th>
                    <th className="px-3 py-2 text-right font-medium text-slate-500">Price</th>
                    <th className="px-3 py-2 text-right font-medium text-slate-500">Discount</th>
                    <th className="px-3 py-2 text-right font-medium text-slate-500">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {quotation.items.map((item) => (
                    <tr key={item.id} className="border-b border-blue-50 last:border-0">
                      <td className="px-3 py-2 text-slate-700">{item.name}</td>
                      <td className="px-3 py-2 text-center text-slate-600">{item.quantity}</td>
                      <td className="px-3 py-2 text-right text-slate-600">{formatCurrency(item.unitPrice)}</td>
                      <td className="px-3 py-2 text-right text-slate-600">{item.discountPercent}%</td>
                      <td className="px-3 py-2 text-right font-medium text-slate-800">
                        {formatCurrency(item.lineTotal)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-blue-200">
                    <td colSpan={4} className="px-3 py-2 text-right font-medium text-slate-500">Subtotal</td>
                    <td className="px-3 py-2 text-right text-slate-600">{formatCurrency(quotation.subtotal)}</td>
                  </tr>
                  <tr>
                    <td colSpan={4} className="px-3 py-2 text-right font-medium text-slate-500">Discount</td>
                    <td className="px-3 py-2 text-right text-rose-600">-{formatCurrency(quotation.discountTotal)}</td>
                  </tr>
                  <tr>
                    <td colSpan={4} className="px-3 py-2 text-right font-medium text-slate-500">Tax</td>
                    <td className="px-3 py-2 text-right text-slate-600">{formatCurrency(quotation.taxTotal)}</td>
                  </tr>
                  <tr className="border-t border-blue-200">
                    <td colSpan={4} className="px-3 py-2 text-right font-semibold text-slate-800">Total</td>
                    <td className="px-3 py-2 text-right font-bold text-slate-900">{formatCurrency(quotation.total)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </Card>

          <Card title="Approval Progress">
            <ApprovalStatus steps={quotation.approvalSteps} />
          </Card>

          <Card title="Fulfillment">
            <FulfillmentStatus status={quotation.fulfillment.status} shipmentCount={quotation.fulfillment.shipmentCount} />
          </Card>
        </div>

        <div className="space-y-5">
          <DealHealthCard quotation={quotation} />
        </div>
      </div>
    </div>
  );
}