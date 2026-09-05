import { Bell, LogOut, RefreshCcw, Search, Settings } from "lucide-react";
import { useAuthContext } from "../../context/AuthContext";

export default function Navbar({ onReload, onOpenSettings }) {
  const { user, logout } = useAuthContext();

  return (
    <header className="flex h-16 items-center justify-between border-b border-royal-100 bg-white px-6">
      <div className="flex items-center gap-3">
        <div className="relative w-72 max-w-full">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-royal-300" />
          <input
            placeholder="Search quotations, customers, products"
            className="w-full rounded-lg border border-royal-100 bg-royal-50/60 py-2 pl-9 pr-3 text-sm placeholder:text-royal-300 focus:outline-none focus:ring-2 focus:ring-royal-300"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onReload}
          className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-royal-600 hover:bg-royal-50"
          title="Reload pricing, stock and approval data"
        >
          <RefreshCcw className="h-4 w-4" />
          Reload Data
        </button>
        <button
          onClick={onOpenSettings}
          className="rounded-lg p-2 text-royal-500 hover:bg-royal-50"
          title="Go to Back-end"
        >
          <Settings className="h-4.5 w-4.5" />
        </button>
        <button className="relative rounded-lg p-2 text-royal-500 hover:bg-royal-50">
          <Bell className="h-4.5 w-4.5" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-plum-500" />
        </button>
        <div className="mx-1 h-8 w-px bg-royal-100" />
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full brand-gradient text-xs font-semibold text-white">
            {(user?.name || "U").slice(0, 1).toUpperCase()}
          </div>
          <div className="hidden text-sm sm:block">
            <p className="font-medium leading-tight text-royal-800">{user?.name || "User"}</p>
            <p className="text-xs capitalize leading-tight text-royal-400">{user?.role || "guest"}</p>
          </div>
        </div>
        <button onClick={logout} className="rounded-lg p-2 text-royal-400 hover:bg-royal-50 hover:text-rose-500">
          <LogOut className="h-4.5 w-4.5" />
        </button>
      </div>
    </header>
  );
}
