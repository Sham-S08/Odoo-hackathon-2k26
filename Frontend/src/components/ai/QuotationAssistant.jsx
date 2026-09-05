import { Sparkles } from "lucide-react";
import Card from "../common/Card";

export default function QuotationAssistant({ message }) {
  return (
    <Card>
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg brand-gradient text-white">
          <Sparkles className="h-4.5 w-4.5" />
        </div>
        <div>
          <p className="text-sm font-medium text-royal-900">Quotation assistant</p>
          <p className="mt-0.5 text-sm text-royal-500">
            {message ||
              "Add products to see live upsell suggestions and margin impact as you build this quote."}
          </p>
        </div>
      </div>
    </Card>
  );
}
