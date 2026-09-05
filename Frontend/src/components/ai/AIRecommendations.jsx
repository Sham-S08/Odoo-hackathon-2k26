import { Sparkles } from "lucide-react";

export default function AIRecommendations({ items = [] }) {
  return (
    <div className="rounded-xl bg-royal-900 p-4 text-white">
      <p className="flex items-center gap-1.5 text-sm font-medium">
        <Sparkles className="h-4 w-4 text-plum-300" />
        AI recommendations
      </p>
      <ul className="mt-2 space-y-1.5 text-sm text-royal-100">
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
