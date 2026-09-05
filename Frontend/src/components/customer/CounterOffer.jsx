export default function CounterOffer({ value, onChange }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-royal-800">
        Requested discount
      </label>
      <div className="relative w-32">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-royal-200 py-2 pl-3 pr-7 text-sm focus:outline-none focus:ring-2 focus:ring-royal-300"
        />
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-royal-400">
          %
        </span>
      </div>
    </div>
  );
}
