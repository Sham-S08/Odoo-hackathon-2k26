import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../components/layout/PageHeader";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Badge from "../../components/common/Badge";
import RiskScore from "../../components/manager/RiskScore";
import ApprovalActions from "../../components/manager/ApprovalActions";
import { approvalsApi } from "../../api/approvals.api";
import { quotationsApi } from "../../api/quotations.api";
import { useNotification } from "../../context/NotificationContext";
import { formatCurrency } from "../../utils/formatCurrency";

export default function ApprovalDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { notify } = useNotification();
  const [quotation, setQuotation] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => { approvalsApi.get(id).then((response) => setQuotation(response.data)).catch((requestError) => setError(requestError.message || "Could not load approval")); }, [id]);
  async function decide(action, reason) { try { if (action === "approve") await quotationsApi.approve(id, {}); if (action === "reject") await quotationsApi.reject(id, { reason }); notify(`Quotation ${action}d`, "success"); navigate("/finance/approvals"); } catch (requestError) { notify(requestError.message || "Decision failed", "error"); throw requestError; } }
  if (error) return <p className="rounded-lg bg-rose-50 p-4 text-sm text-rose-700">{error}</p>;
  if (!quotation) return <p className="text-sm text-slate-500">Loading approval...</p>;
  const health = quotation.dealHealth?.[0];
  return <div><PageHeader title={`High-risk approval ${quotation.id}`} description={`${quotation.customer?.name || "Customer"} · ${formatCurrency(Number(quotation.total || 0))}`} actions={<Button variant="secondary" onClick={() => navigate("/finance/approvals")}>Back</Button>} /><div className="grid grid-cols-1 gap-5 lg:grid-cols-3"><div className="lg:col-span-2"><Card title="Quotation items"><table className="w-full text-left text-sm"><thead><tr className="border-b border-blue-100"><th className="px-3 py-2">Product</th><th className="px-3 py-2">Quantity</th><th className="px-3 py-2">Discount</th><th className="px-3 py-2">Line total</th></tr></thead><tbody>{quotation.items?.map((item) => <tr key={item.id} className="border-b border-blue-50"><td className="px-3 py-2">{item.product?.name || item.productId}</td><td className="px-3 py-2">{item.quantity}</td><td className="px-3 py-2">{item.discountPercent}%</td><td className="px-3 py-2">{formatCurrency(Number(item.lineTotal || 0))}</td></tr>)}</tbody></table></Card></div><div className="space-y-5"><Card title="AI deal health"><RiskScore score={health?.riskScore || 0} level={health?.riskLevel || "CRITICAL"} reasons={health?.reasons || []} /></Card><Card title="Finance decision"><ApprovalActions quotationId={id} currentStatus="Pending" onDecision={decide} /></Card></div></div></div>;
}
