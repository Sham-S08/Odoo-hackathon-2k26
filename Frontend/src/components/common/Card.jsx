export default function Card({ children, className = "", padded = true, title, action }) {
  return (
    <div className={`rounded-2xl border border-royal-100 bg-white shadow-panel ${className}`}>
      {(title || action) && (
        <div className="flex items-center justify-between border-b border-royal-50 px-5 py-4">
          {title && <h3 className="font-display font-semibold text-royal-900">{title}</h3>}
          {action}
        </div>
      )}
      <div className={padded ? "p-5" : ""}>{children}</div>
    </div>
  );
}
