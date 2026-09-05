import { useState } from "react";
import { Send } from "lucide-react";
import Button from "../common/Button";
import CounterOffer from "./CounterOffer";

export default function NegotiationForm({ onSubmit, sending }) {
  const [message, setMessage] = useState("");
  const [discount, setDiscount] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit?.({ requestedDiscountPercent: Number(discount) || 0, message });
    setMessage("");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-royal-100 bg-white p-4">
      <CounterOffer value={discount} onChange={setDiscount} />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Can you provide an additional discount for this quantity?"
        rows={3}
        className="w-full rounded-lg border border-royal-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-royal-300"
      />
      <Button type="submit" variant="gradient" icon={Send} loading={sending}>
        Submit Request
      </Button>
    </form>
  );
}
