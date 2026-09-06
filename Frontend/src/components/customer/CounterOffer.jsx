export default function CounterOffer({ value, onChange, currentDiscount }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">
        Requested Discount
        {currentDiscount && (
          <span className="ml-2 text-xs text-slate-400 font-normal">
            (Current: {currentDiscount}%)
          </span>
        )}
      </label>
      <div className="relative w-32">
        <input
          type="number"
          min={0}
          max={100}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-slate-200 py-2 pl-3 pr-7 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
          %
        </span>
      </div>
      {value && currentDiscount && Number(value) > currentDiscount && (
        <p className="mt-1 text-xs text-amber-600">
          ⚠️ Requesting a higher discount than currently offered ({currentDiscount}%)
        </p>
      )}
    </div>
  );
}