import { ChevronDown } from "lucide-react";

export default function Select({
  label,
  error,
  options = [],
  placeholder = "Select an option",
  containerClassName = "",
  id,
  ...props
}) {
  const selectId = id || props.name;
  return (
    <div className={containerClassName}>
      {label && (
        <label htmlFor={selectId} className="mb-1.5 block text-sm font-medium text-royal-800">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          className={`w-full appearance-none rounded-lg border bg-white px-3 py-2 pr-9 text-sm text-royal-900
            focus:outline-none focus:ring-2 focus:ring-royal-400 focus:border-transparent
            ${error ? "border-rose-400" : "border-royal-200"}`}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-royal-400" />
      </div>
      {error && <p className="mt-1 text-xs text-rose-600">{error}</p>}
    </div>
  );
}
