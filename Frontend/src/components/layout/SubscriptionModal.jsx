import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import Modal from "../common/Modal";
import Button from "../common/Button";
import Badge from "../common/Badge";
import SubscriptionPlanForm from "../admin/SubscriptionPlanForm";
import { subscriptionPlansApi } from "../../api/subscriptionPlans.api";
import { useSubscriptionPlans } from "../../hooks/useSubscriptionPlans";
import { useNotification } from "../../context/NotificationContext";
import { formatCurrency } from "../../utils/formatCurrency";

function toViewModel(plan) {
  return { ...plan, price: Number(plan.price), status: plan.active ? "Active" : "Inactive" };
}

export default function SubscriptionModal({ open, onClose, isAdmin }) {
  const { plans: records, loading, error, refresh } = useSubscriptionPlans();
  const { notify } = useNotification();
  const [editing, setEditing] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const plans = records.map(toViewModel);

  async function save(form) {
    try {
      const payload = { name: form.name, cadence: form.cadence, price: Number(form.price), prorationRule: form.prorationRule || null, cancellationRule: form.cancellationRule || null, active: form.status === "Active" };
      editing ? await subscriptionPlansApi.update(editing.id, payload) : await subscriptionPlansApi.create(payload);
      setFormOpen(false);
      setEditing(null);
      await refresh();
      notify("Subscription plan saved", "success");
    } catch (requestError) {
      notify(requestError.message || "Could not save subscription plan", "error");
    }
  }

  async function remove(plan) {
    if (!window.confirm(`Delete ${plan.name}?`)) return;
    try {
      await subscriptionPlansApi.remove(plan.id);
      await refresh();
      notify("Subscription plan deleted", "success");
    } catch (requestError) {
      notify(requestError.message || "Could not delete subscription plan", "error");
    }
  }

  return <Modal open={open} onClose={onClose} title="Subscription Plans" size="lg">
    <div className="space-y-4">
      {isAdmin ? <div className="flex justify-end"><Button icon={Plus} onClick={() => { setEditing(null); setFormOpen(true); }}>Add Plan</Button></div> : null}
      {error ? <p className="rounded-lg bg-rose-50 p-3 text-sm text-rose-700">{error}</p> : null}
      {loading ? <p className="text-sm text-slate-500">Loading plans...</p> : plans.length === 0 ? <p className="text-sm text-slate-500">No subscription plans configured.</p> : <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead><tr className="border-b border-blue-100 bg-blue-50/40"><th className="px-3 py-2">Plan</th><th className="px-3 py-2">Cadence</th><th className="px-3 py-2">Price</th><th className="px-3 py-2">Rules</th><th className="px-3 py-2">Status</th><th className="px-3 py-2 text-right">Actions</th></tr></thead><tbody>{plans.map((plan) => <tr key={plan.id} className="border-b border-blue-50"><td className="px-3 py-3 font-medium text-slate-800">{plan.name}</td><td className="px-3 py-3">{plan.cadence}</td><td className="px-3 py-3">{formatCurrency(plan.price)}</td><td className="max-w-xs px-3 py-3 text-xs text-slate-500"><div>{plan.prorationRule || "-"}</div><div>{plan.cancellationRule || "-"}</div></td><td className="px-3 py-3"><Badge tone={plan.status === "Active" ? "green" : "slate"}>{isAdmin ? plan.status : "View"}</Badge></td><td className="px-3 py-3 text-right">{isAdmin ? <span className="inline-flex gap-1"><Button variant="ghost" icon={Pencil} onClick={() => { setEditing(plan); setFormOpen(true); }} title="Edit plan" /><Button variant="ghost" icon={Trash2} onClick={() => remove(plan)} title="Delete plan" /></span> : <span className="text-xs text-slate-400">Read-only</span>}</td></tr>)}</tbody></table></div>}
    </div>
    <Modal open={formOpen} onClose={() => setFormOpen(false)} title={editing ? "Edit Subscription Plan" : "New Subscription Plan"} size="lg"><SubscriptionPlanForm initialValue={editing} onSubmit={save} onCancel={() => setFormOpen(false)} /></Modal>
  </Modal>;
}
