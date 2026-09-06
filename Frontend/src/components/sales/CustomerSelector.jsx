import { Building2, Search } from "lucide-react";
import Badge from "../common/Badge";

const TIER_TONES = { Bronze: "amber", Silver: "slate", Gold: "royal" };

export default function CustomerSelector({ customers = [], selected, onSelect, query, onQueryChange }) {
  const filtered = customers.filter((c) =>
    [c.name, c.email, c.phone, c.tier, c.status]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes((query || "").toLowerCase())
  );

  return (
    <div>
      <div className="relative mb-3">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-royal-300" />
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search customer"
          className="w-full rounded-lg border border-royal-200 bg-white py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-royal-300"
        />
      </div>
      <div className="max-h-56 space-y-1 overflow-y-auto">
        {filtered.map((customer) => (
          <button
            key={customer.id}
            onClick={() => onSelect(customer)}
            className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
              selected?.id === customer.id
                ? "bg-royal-600 text-white"
                : "hover:bg-royal-50 text-royal-800"
            }`}
          >
            <span className="flex items-center gap-2">
              <Building2 className="h-4 w-4 opacity-70" />
              <span>
                <span className="block">{customer.name}</span>
                <span className={`block text-xs ${selected?.id === customer.id ? "text-royal-100" : "text-royal-400"}`}>
                  {customer.email}{customer.phone ? ` · ${customer.phone}` : ""}
                </span>
              </span>
            </span>
            <span className="flex shrink-0 flex-col items-end gap-1">
              <Badge tone={selected?.id === customer.id ? "royal" : TIER_TONES[customer.tier]}>
                {customer.tier}
              </Badge>
              <span className="text-[10px] opacity-70">{customer.status}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
