import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";
import RiskScore from "../../components/manager/RiskScore";
import ApprovalActions from "../../components/manager/ApprovalActions";
import { quotationsApi } from "../../api/quotations.api";
import { useNotification } from "../../context/NotificationContext";
import { formatCurrency } from "../../utils/formatCurrency";

export default function ApprovalDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { notify } = useNotification();
  const [quotation, setQuotation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const load = async () => { setLoading(true); try { const response = await quotationsApi.get(id); setQuotation(response.data); setError(null); } catch (requestError) { setError(requestError.message || "Could not load quotation"); } finally { setLoading(false); } };
  useEffect(() => { load(); }, [id]);
  const health = quotation?.dealHealth?.[0];
  const status = quotation?.status?.replaceAll("_", " ") || "";
  const decision = async (action, reason) => { try { if (action === "approve") await quotationsApi.approve(id, {}); else if (action === "reject") await quotationsApi.reject(id, { reason }); else return; notify(`Quotation ${action}d successfully`, "success"); await load(); } catch (requestError) { notify(requestError.message || `Could not ${action} quotation`, "error"); throw requestError; } };
  const items = useMemo(() => quotation?.items || [], [quotation]);
  if (loading) return <p className="text-sm text-slate-500">Loading quotation...</p>;
  if (error || !quotation) return <div><p className="rounded-lg bg-rose-50 p-4 text-sm text-rose-700">{error || "Quotation not found"}</p><Button className="mt-4" variant="secondary" onClick={() => navigate("/manager/approvals")}>Back to approvals</Button></div>;
  return <div><PageHeader title={`Review ${quotation.id}`} description={`${quotation.customer?.name || "Customer"} · ${formatCurrency(Number(quotation.total || 0))}`} actions={<Button variant="secondary" icon={ArrowLeft} onClick={() => navigate("/manager/approvals")}>Back</Button>} /><div className="grid grid-cols-1 gap-5 lg:grid-cols-3"><div className="space-y-5 lg:col-span-2"><Card title="Quotation details"><div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-4"><div><p className="text-xs text-slate-400">Customer</p><p className="text-sm font-medium">{quotation.customer?.name}</p></div><div><p className="text-xs text-slate-400">Status</p><Badge tone={quotation.status === "APPROVED" ? "green" : quotation.status === "REJECTED" ? "rose" : "amber"}>{status}</Badge></div><div><p className="text-xs text-slate-400">Subtotal</p><p className="text-sm font-medium">{formatCurrency(Number(quotation.subtotal || 0))}</p></div><div><p className="text-xs text-slate-400">Total</p><p className="text-sm font-medium">{formatCurrency(Number(quotation.total || 0))}</p></div></div><div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead><tr className="border-b border-blue-100"><th className="px-3 py-2">Product</th><th className="px-3 py-2">Qty</th><th className="px-3 py-2">Discount</th><th className="px-3 py-2">Line total</th></tr></thead><tbody>{items.map((item) => <tr key={item.id} className="border-b border-blue-50"><td className="px-3 py-2">{item.product?.name || item.productId}</td><td className="px-3 py-2">{item.quantity}</td><td className="px-3 py-2">{item.discountPercent}%</td><td className="px-3 py-2">{formatCurrency(Number(item.lineTotal || 0))}</td></tr>)}</tbody></table></div></Card>{health?.reasons?.length ? <Card title="AI risk factors"><ul className="list-disc space-y-1 pl-5 text-sm text-slate-600">{health.reasons.map((reason, index) => <li key={index}>{typeof reason === "string" ? reason : JSON.stringify(reason)}</li>)}</ul></Card> : null}</div><div className="space-y-5"><Card title="AI deal health"><RiskScore score={health?.riskScore || 0} level={health?.riskLevel || "LOW"} reasons={health?.reasons || []} /></Card><Card title="Decision"><ApprovalActions quotationId={id} currentStatus={status} onDecision={decision} /></Card></div></div></div>;
}
