import { NavLink } from "react-router-dom";
import {
  Boxes,
  FileText,
  Gauge,
  KanbanSquare,
  LayoutDashboard,
  Package,
  ShieldCheck,
  Users,
  Warehouse,
  Sparkles,
  BarChart3,
  CreditCard,
  Truck,
  User,
} from "lucide-react";
import { ROLES } from "../../utils/constants";
import { AlertTriangle, Clock, TrendingUp} from "lucide-react";

const NAV_BY_ROLE = {
  [ROLES.ADMIN]: [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
    { to: "/admin/users", label: "Users", icon: Users },
    { to: "/admin/products", label: "Products", icon: Package },
    { to: "/admin/customers", label: "Customers", icon: Users },
    { to: "/admin/discount-rules", label: "Discount Rules", icon: ShieldCheck },
    { to: "/admin/warehouses", label: "Warehouses", icon: Warehouse },
    { to: "/admin/inventory", label: "Inventory", icon: Boxes },
    { to: "/admin/subscription-plans", label: "Subscription Plans", icon: FileText },
    { to: "/admin/upsell-rules", label: "Upsell Rules", icon: Sparkles },
  ],
  [ROLES.SALES]: [
    { to: "/sales", label: "Dashboard", icon: LayoutDashboard, end: true },
    { to: "/sales/quotations", label: "Quotations", icon: FileText },
    { to: "/sales/pipeline", label: "Pipeline", icon: KanbanSquare },
    { to: "/sales/quotations/new", label: "New Quotation", icon: Package },
  ],
  [ROLES.MANAGER]: [
    { to: "/manager", label: "Dashboard", icon: LayoutDashboard, end: true },
    { to: "/manager/approvals", label: "Approval Queue", icon: ShieldCheck },
    { to: "/manager/negotiations", label: "Negotiations", icon: TrendingUp },
    { to: "/manager/deal-health", label: "Deal Health", icon: AlertTriangle },
    { to: "/manager/stalled-deals", label: "Stalled Deals", icon: Clock },
    { to: "/manager/discount-anomalies", label: "Discount Anomalies", icon: TrendingUp },
    { to: "/manager/reports", label: "Reports", icon: BarChart3 },
  ],
  [ROLES.FINANCE]: [
    { to: "/finance", label: "Dashboard", icon: LayoutDashboard, end: true },
    { to: "/finance/approvals", label: "Approvals", icon: ShieldCheck },
    { to: "/finance/fulfillment", label: "Fulfillment", icon: Truck },
    { to: "/finance/inventory", label: "Inventory", icon: Boxes },
    { to: "/finance/billing", label: "Billing", icon: CreditCard },
    { to: "/finance/invoices", label: "Invoices", icon: FileText },
  ],
  [ROLES.CUSTOMER]: [
  { to: "/portal", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/portal/quotations", label: "My Quotations", icon: FileText },
  { to: "/portal/profile", label: "Profile", icon: User },
],
};

export default function Sidebar({ role = ROLES.SALES }) {
  const items = NAV_BY_ROLE[role] || [];

  return (
    <aside className="flex h-full w-60 shrink-0 flex-col border-r border-blue-100 bg-white">
      <div className="flex items-center gap-2 px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
          <Gauge className="h-5 w-5" />
        </div>
        <div>
          <p className="font-display text-base font-semibold leading-tight text-slate-800">
            DealFlow360
          </p>
          <p className="text-[11px] leading-tight text-slate-400">Sales Operations</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {items.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-600 hover:bg-blue-50"
              }`
            }
          >
            <Icon className="h-4.5 w-4.5" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mx-3 mb-4 rounded-xl bg-blue-50/60 p-3">
        <p className="text-xs font-medium text-blue-700">Blended risk engine</p>
        <p className="mt-1 text-[11px] leading-snug text-slate-500">
          Every line is checked against its own discount ceiling before a quote is
          auto-routed for approval.
        </p>
      </div>
    </aside>
  );
}
