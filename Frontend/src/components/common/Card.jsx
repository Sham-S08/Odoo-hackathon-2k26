export default function Card({ children, className = "", padded = true, title, action }) {
  return (
    <div className={`rounded-2xl border border-blue-100 bg-white shadow-sm ${className}`}>
      {(title || action) && (
        <div className="flex items-center justify-between border-b border-blue-50 px-5 py-4">
          {title && <h3 className="font-display font-semibold text-slate-800">{title}</h3>}
          {action}
        </div>
      )}
      <div className={padded ? "p-5" : ""}>{children}</div>
    </div>
  );
}