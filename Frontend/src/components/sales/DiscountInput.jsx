import { Percent } from "lucide-react";

export default function DiscountInput({ value, ceiling, onChange }) {
  const overCeiling = ceiling !== undefined && Number(value) > ceiling;
  return (
    <div className="w-24">
      <div className="relative">
        <input
          type="number"
          min={0}
          max={100}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={`w-full rounded-lg border bg-white py-1.5 pl-2 pr-7 text-sm focus:outline-none focus:ring-2 ${
            overCeiling
              ? "border-amber-400 focus:ring-amber-300"
              : "border-royal-200 focus:ring-royal-300"
          }`}
        />
        <Percent className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-royal-300" />
      </div>
      {overCeiling && (
        <p className="mt-0.5 text-[11px] leading-tight text-amber-600">
          Above {ceiling}% ceiling
        </p>
      )}
    </div>
  );
}
