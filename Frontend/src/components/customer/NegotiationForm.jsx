import { useState } from "react";
import { Send, X } from "lucide-react";
import Button from "../common/Button";
import CounterOffer from "./CounterOffer";
import Card from "../common/Card";

export default function NegotiationForm({ onSubmit, onCancel, currentDiscount }) {
  const [discount, setDiscount] = useState(currentDiscount || "");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!discount && !message) {
      return;
    }
    setSending(true);
    try {
      await onSubmit({
        requestedDiscountPercent: Number(discount) || 0,
        message: message || "I'd like to request changes to this quotation."
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <Card title="Request Changes">
      <form onSubmit={handleSubmit} className="space-y-4">
        <CounterOffer 
          value={discount} 
          onChange={setDiscount}
          currentDiscount={currentDiscount}
        />
        
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Can you offer a better discount on the laptops? We're ordering in bulk."
            rows={3}
            className="w-full rounded-lg border border-slate-200 p-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex gap-2">
          <Button 
            type="submit" 
            variant="primary" 
            icon={Send} 
            loading={sending}
            className="flex-1"
          >
            Submit Request
          </Button>
          <Button 
            type="button" 
            variant="secondary" 
            icon={X} 
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>

        <p className="text-xs text-slate-400">
          ⚠️ Submitting a negotiation will create a new version and trigger re-approval.
        </p>
      </form>
    </Card>
  );
}