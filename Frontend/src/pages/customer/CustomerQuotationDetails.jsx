import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Clock, MessageSquare } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";
import QuotationDetails from "../../components/customer/QuotationDetails";
import NegotiationForm from "../../components/customer/NegotiationForm";
import VersionHistory from "../../components/customer/VersionHistory";
import ReviewConfirm from "../../components/customer/ReviewConfirm";
import { useNegotiation } from "../../hooks/useNegotiation";
import { useQuotation } from "../../hooks/useQuotation";
import { useConfirmQuotation } from "../../hooks/useConfirmQuotation";
import { useNotification } from "../../context/NotificationContext";
import { displayStatus } from "../../utils/customerStatus";

export default function CustomerQuotationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { notify } = useNotification();
  const { sendRequest, sending } = useNegotiation(id);
  const { quotation, loading, error, refresh: refreshQuotation } = useQuotation(id);
  const { confirm, confirming } = useConfirmQuotation(id);
  const [showNegotiation, setShowNegotiation] = useState(false);
  const maxDiscount = useMemo(() => Math.max(0, ...(quotation?.items || []).map((item) => Number(item.discountPercent || 0))), [quotation]);
  async function negotiate(payload) { try { await sendRequest(payload); notify("Change request sent for review", "success"); setShowNegotiation(false); await refreshQuotation(); } catch (requestError) { notify(requestError.message || "Could not submit request", "error"); } }
  async function confirmQuotation() { try { await confirm(); notify("Quotation confirmed", "success"); await refreshQuotation(); } catch (requestError) { notify(requestError.message || "Could not confirm quotation", "error"); } }
  if (loading) return <p className="text-sm text-slate-500">Loading quotation...</p>;
  if (error || !quotation) return <div><p className="rounded-lg bg-rose-50 p-4 text-sm text-rose-700">{error || "Quotation not found"}</p><Button className="mt-4" variant="secondary" onClick={() => navigate("/portal/quotations")}>Back to quotations</Button></div>;
  const status = displayStatus(quotation.status);
  const canNegotiate = ["APPROVED", "CUSTOMER_REVIEW", "NEGOTIATION"].includes(quotation.status);
  const canConfirm = quotation.status === "APPROVED";
  const versions = (quotation.versions || []).map((version) => ({ ...version, version: version.versionNumber, total: Number(version.total || 0), status: displayStatus(version.status) }));
  return <div><PageHeader title={`Quotation ${quotation.id}`} description={`${status} · Version ${quotation.versionNumber}`} actions={<Button variant="secondary" icon={ArrowLeft} onClick={() => navigate("/portal/quotations")}>Back</Button>} />{canConfirm ? <div className="mb-4 flex items-center gap-3 rounded-xl border border-purple-200 bg-purple-50 p-4"><Clock className="h-6 w-6 text-purple-500" /><p className="text-sm text-purple-700">Updated terms are ready for your confirmation.</p></div> : null}{quotation.status === "CUSTOMER_ACCEPTED" ? <div className="mb-4 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4"><CheckCircle2 className="h-6 w-6 text-emerald-500" /><p className="text-sm text-emerald-700">Quotation confirmed and ready for fulfillment.</p></div> : null}<div className="grid grid-cols-1 gap-5 lg:grid-cols-3"><div className="space-y-5 lg:col-span-2"><QuotationDetails quotation={quotation} />{canConfirm ? <ReviewConfirm quotation={quotation} onConfirm={confirmQuotation} confirmed={confirming} /> : null}</div><div className="space-y-5"><Card title="Quotation status"><div className="space-y-3 text-sm"><div className="flex justify-between"><span className="text-slate-500">Status</span><Badge tone="blue">{status}</Badge></div><div className="flex justify-between"><span className="text-slate-500">Version</span><span>v{quotation.versionNumber}</span></div><div className="flex justify-between"><span className="text-slate-500">Total</span><strong>{Number(quotation.total || 0).toLocaleString()}</strong></div></div></Card>{canNegotiate && !showNegotiation ? <Card><Button variant="secondary" icon={MessageSquare} className="w-full" onClick={() => setShowNegotiation(true)}>Request Changes / Discount</Button></Card> : null}{canNegotiate && showNegotiation ? <NegotiationForm onSubmit={negotiate} onCancel={() => setShowNegotiation(false)} currentDiscount={maxDiscount} /> : null}{versions.length ? <VersionHistory versions={versions} /> : null}{quotation.negotiations?.length ? <Card title="Negotiation history"><div className="space-y-3">{quotation.negotiations.map((item) => <div key={item.id} className="border-b border-blue-50 pb-2 last:border-0"><p className="text-sm font-medium">Requested {item.requestedDiscountPercent}% discount</p><p className="text-sm text-slate-600">{item.message}</p><p className="text-xs text-slate-400">{new Date(item.createdAt).toLocaleString()}</p></div>)}</div></Card> : null}</div></div></div>;
}
