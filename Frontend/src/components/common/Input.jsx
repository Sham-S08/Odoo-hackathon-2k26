export default function Input({
  label,
  error,
  icon: Icon,
  className = "",
  containerClassName = "",
  id,
  ...props
}) {
  const inputId = id || props.name;
  return (
    <div className={containerClassName}>
      {label && (
        <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-royal-800">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-royal-400" />
        )}
        <input
          id={inputId}
          className={`w-full rounded-lg border bg-white px-3 py-2 text-sm text-royal-900 placeholder:text-royal-300
            focus:outline-none focus:ring-2 focus:ring-royal-400 focus:border-transparent
            ${Icon ? "pl-9" : ""}
            ${error ? "border-rose-400" : "border-royal-200"}
            ${className}`}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-xs text-rose-600">{error}</p>}
    </div>
  );
}
