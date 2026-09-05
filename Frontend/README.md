# DealFlow360 — Frontend

An intelligent, self-governing Sales Operations frontend: quotation building with
live upsell suggestions, blended discount-risk approval routing, multi-warehouse
fulfillment splitting, hybrid one-time/subscription billing, a customer negotiation
portal, and a deal-health dashboard.

## Stack

- React 18 + Vite
- React Router v6 (role-based routing: admin / sales / manager / customer portal)
- Tailwind CSS (royal blue + plum/purple palette, no emoji — icons only via `lucide-react`)
- Axios for the REST client
- Recharts for dashboard charts

## Getting started

```bash
npm install
npm run dev
```

The app expects an API at `VITE_API_BASE_URL` (see `.env`), matching the
`DealFlow360 API Quick Reference` (`/api/v1`, auth, quotations, approvals,
negotiations, orders, invoices, AI endpoints). Until a backend is connected,
every page renders from seed data in `src/utils/sampleData.js` so the full
flow can be demoed end to end.

## Structure

```
src/
  api/         Thin axios wrappers per resource, matching the API quick reference
  components/  common | layout | auth | admin | sales | ai | manager | customer |
               fulfillment | billing | dashboard
  pages/       auth | admin | sales | manager | customer
  hooks/       Data-fetching hooks per resource + quotation builder / negotiation / deal health
  context/     AuthContext, QuotationContext, NotificationContext
  routes/      AppRoutes + role-scoped route trees
  utils/       formatCurrency, formatDate, validation, constants, sampleData
```

## Roles & flow

1. **Admin** configures products, price lists, discount tiers & approval chains,
   warehouses, and subscription plans.
2. **Sales rep** builds a quotation, sees live upsell suggestions and margin
   impact, and confirms — auto-routing to approval when the blended discount
   risk score crosses a threshold.
3. **Sales Manager / Finance** reviews flagged quotations against per-line
   discount ceilings, with a full audit trail.
4. Once approved, the order gets a suggested **warehouse split**, mixes
   one-time and **recurring subscription** billing, and the **customer**
   negotiates or confirms directly from their portal — re-entering approval
   automatically if new terms exceed thresholds.
5. **Deal Health dashboard** surfaces stalled deals and discount anomalies in
   real time.

## Notes

- Discount ceilings are enforced per line (not just per order) — see
  `QuotationBuilder` + `DiscountInput`, which flag any line above its
  category/tier ceiling before submission.
- No emoji anywhere in the UI — status and section markers use `lucide-react`
  icons only.
