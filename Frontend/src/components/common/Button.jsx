import { Loader2 } from "lucide-react";

const VARIANTS = {
  primary:
    "bg-royal-600 text-white hover:bg-royal-700 focus-visible:ring-royal-400",
  gradient:
    "brand-gradient text-white hover:opacity-90 focus-visible:ring-plum-300",
  secondary:
    "bg-white text-royal-700 border border-royal-200 hover:bg-royal-50 focus-visible:ring-royal-300",
  ghost:
    "bg-transparent text-royal-700 hover:bg-royal-100 focus-visible:ring-royal-300",
  danger:
    "bg-rose-600 text-white hover:bg-rose-700 focus-visible:ring-rose-300",
};

const SIZES = {
  sm: "text-sm px-3 py-1.5 gap-1.5",
  md: "text-sm px-4 py-2 gap-2",
  lg: "text-base px-5 py-2.5 gap-2",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  loading = false,
  disabled = false,
  className = "",
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center rounded-lg font-medium transition-colors
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        Icon && iconPosition === "left" && <Icon className="h-4 w-4" />
      )}
      {children}
      {!loading && Icon && iconPosition === "right" && <Icon className="h-4 w-4" />}
    </button>
  );
}
