// Seed data used to demo the workflow end to end before a real API is wired up.

export const SAMPLE_CUSTOMERS = [
  { id: "cus_101", name: "Acme Corp", tier: "Gold", contactEmail: "ops@acme.com", currency: "USD" },
  { id: "cus_102", name: "Beta Industries", tier: "Silver", contactEmail: "buy@beta.io", currency: "USD" },
  { id: "cus_103", name: "Northwind Traders", tier: "Bronze", contactEmail: "hello@northwind.com", currency: "USD" },
  { id: "cus_104", name: "Globex", tier: "Gold", contactEmail: "procurement@globex.com", currency: "USD" },
];

export const SAMPLE_PRODUCTS = [
  { id: "prod_101", name: "ProBook Laptop 14\"", category: "Hardware", price: 1200, cost: 820 },
  { id: "prod_102", name: "Setup & Onboarding Service", category: "Services", price: 450, cost: 300 },
  { id: "prod_103", name: "24/7 Support Plan", category: "Subscriptions", price: 99, cost: 40 },
  { id: "prod_104", name: "Wireless Docking Station", category: "Hardware", price: 165, cost: 95 },
  { id: "prod_105", name: "Extended Warranty - 3yr", category: "Services", price: 240, cost: 120 },
  { id: "prod_106", name: "Analytics Add-on", category: "Subscriptions", price: 59, cost: 18 },
];

export const SAMPLE_QUOTATIONS = [
  {
    id: "quo_5001",
    customerName: "Acme Corp",
    total: 24800,
    stage: "Pending Approval",
    rep: "Priya Shah",
    updatedAt: "2026-08-27T10:00:00Z",
    riskScore: 62,
    idleDays: 6,
  },
  {
    id: "quo_5002",
    customerName: "Beta Industries",
    total: 9600,
    stage: "Draft",
    rep: "Marcus Lee",
    updatedAt: "2026-09-03T14:00:00Z",
    riskScore: 18,
    idleDays: 1,
  },
  {
    id: "quo_5003",
    customerName: "Northwind Traders",
    total: 15200,
    stage: "Under Negotiation",
    rep: "Priya Shah",
    updatedAt: "2026-08-29T09:00:00Z",
    riskScore: 45,
    idleDays: 4,
  },
  {
    id: "quo_5004",
    customerName: "Globex",
    total: 41500,
    stage: "Confirmed",
    rep: "Dana Okafor",
    updatedAt: "2026-08-20T09:00:00Z",
    riskScore: 30,
    idleDays: 12,
  },
];

export const SAMPLE_APPROVALS = [
  {
    id: "apr_9001",
    customerName: "Acme Corp",
    rep: "Priya Shah",
    total: 24800,
    level: "Finance",
    riskScore: 68,
    reasons: [
      "Setup Service line discounted 18% against a 10% category ceiling",
      "Blended score across all lines exceeds the Finance escalation threshold",
    ],
    violations: [
      { line: "ProBook Laptop 14\" (Hardware)", given: 12, allowed: 15 },
      { line: "Setup & Onboarding Service (Services)", given: 18, allowed: 10 },
    ],
  },
];

export const SAMPLE_WAREHOUSES = [
  { id: "wh_1", name: "Main Warehouse", location: "Ahmedabad, IN", stockLevel: "Healthy", shippingWeight: 1 },
  { id: "wh_2", name: "East Depot", location: "Chennai, IN", stockLevel: "Low on hardware", shippingWeight: 1.4 },
];

export const SAMPLE_INVENTORY = [
  { id: "inv_1", productName: "ProBook Laptop 14\"", warehouseName: "Main Warehouse", quantity: 42 },
  { id: "inv_2", productName: "ProBook Laptop 14\"", warehouseName: "East Depot", quantity: 6 },
  { id: "inv_3", productName: "Wireless Docking Station", warehouseName: "Main Warehouse", quantity: 0 },
];

export const SAMPLE_USERS = [
  { id: "usr_1", name: "Priya Shah", email: "priya@dealflow360.com", role: "sales", status: "Active" },
  { id: "usr_2", name: "Marcus Lee", email: "marcus@dealflow360.com", role: "sales", status: "Active" },
  { id: "usr_3", name: "Dana Okafor", email: "dana@dealflow360.com", role: "manager", status: "Active" },
];

export const SAMPLE_INVOICES = [
  { id: "inv_2001", orderId: "ord_3001", amount: 24800, dueDate: "2026-09-20", status: "Pending" },
  { id: "inv_2002", orderId: "ord_3002", amount: 41500, dueDate: "2026-08-15", status: "Paid" },
];

export const SAMPLE_SALES_TREND = [
  { label: "Mon", value: 12400 },
  { label: "Tue", value: 15800 },
  { label: "Wed", value: 11200 },
  { label: "Thu", value: 19600 },
  { label: "Fri", value: 21500 },
  { label: "Sat", value: 9800 },
  { label: "Sun", value: 7600 },
];

export const SAMPLE_DEAL_HEALTH_TREND = [
  { label: "W1", value: 4 },
  { label: "W2", value: 6 },
  { label: "W3", value: 3 },
  { label: "W4", value: 8 },
];

export const SAMPLE_STALLED_DEALS = [
  { id: "quo_5004", customerName: "Globex", total: 41500, idleDays: 12 },
  { id: "quo_5001", customerName: "Acme Corp", total: 24800, idleDays: 6 },
];

export const SAMPLE_DISCOUNT_ANOMALIES = [
  { id: "anom_1", repName: "Priya Shah", discountGiven: 18, repAverage: 9, quotationId: "quo_5001" },
];
