// ==================== ADMIN MOCK DATA ====================

// ==================== 1. DASHBOARD ====================
export const MOCK_DASHBOARD = {
  stats: {
    totalProducts: 10,
    totalCustomers: 6,
    activeUsers: 5,
    pendingApprovals: 3,
    lowStockProducts: 2,
    activeSubscriptionPlans: 3,
    atRiskDeals: 2,
    openNegotiations: 1
  },
  approvalOverview: {
    pendingManager: 3,
    pendingFinance: 0,
    approved: 12,
    rejected: 2
  },
  inventoryOverview: {
    totalStock: 1100,
    lowStock: 2,
    outOfStock: 1,
    backordered: 0
  },
  salesOverview: {
    quotations: 6,
    orders: 4,
    revenue: 90257.5,
    discountGiven: 12540
  },
  dealHealth: {
    low: 2,
    medium: 2,
    high: 2,
    critical: 0
  },
  recentActivity: [
    { user: "Admin User", action: "created product", entity: "MacBook Pro 14-inch", timestamp: "2 min ago" },
    { user: "Admin User", action: "updated discount rule", entity: "Gold → Services (10% max)", timestamp: "15 min ago" },
    { user: "Admin User", action: "added warehouse", entity: "North Distribution Center", timestamp: "1 hour ago" },
    { user: "Sales User", action: "created quotation", entity: "quo-6 for Acme Corp", timestamp: "3 hours ago" },
    { user: "Manager User", action: "approved quotation", entity: "quo-5 for TechCorp", timestamp: "5 hours ago" },
    { user: "Admin User", action: "added subscription plan", entity: "Enterprise Security Bundle", timestamp: "1 day ago" },
    { user: "Admin User", action: "updated inventory", entity: "Dell XPS 15 Laptop → +5 units", timestamp: "1 day ago" }
  ]
};

// ==================== 2. USERS ====================
export const MOCK_USERS = [
  {
    id: "usr-1",
    name: "Admin User",
    email: "admin@dealflow360.local",
    role: "admin",
    status: "Active",
    createdAt: "2026-09-01T10:00:00Z",
    lastLogin: "2026-09-06T09:00:00Z"
  },
  {
    id: "usr-2",
    name: "Sales User",
    email: "sales@dealflow360.local",
    role: "sales",
    status: "Active",
    createdAt: "2026-09-01T10:00:00Z",
    lastLogin: "2026-09-06T08:30:00Z"
  },
  {
    id: "usr-3",
    name: "Manager User",
    email: "manager@dealflow360.local",
    role: "manager",
    status: "Active",
    createdAt: "2026-09-01T10:00:00Z",
    lastLogin: "2026-09-05T17:00:00Z"
  },
  {
    id: "usr-4",
    name: "Finance User",
    email: "finance@dealflow360.local",
    role: "finance",
    status: "Active",
    createdAt: "2026-09-01T10:00:00Z",
    lastLogin: "2026-09-05T16:00:00Z"
  },
  {
    id: "usr-5",
    name: "Acme Customer",
    email: "customer@abc.local",
    role: "customer",
    status: "Active",
    createdAt: "2026-09-01T10:00:00Z",
    lastLogin: "2026-09-05T14:00:00Z"
  },
  {
    id: "usr-6",
    name: "Inactive User",
    email: "inactive@dealflow360.local",
    role: "sales",
    status: "Inactive",
    createdAt: "2026-08-15T10:00:00Z",
    lastLogin: "2026-08-20T09:00:00Z"
  }
];

// ==================== 3. PRODUCTS ====================
export const MOCK_PRODUCTS = [
  {
    id: "prod-1",
    sku: "LAP-DELL-001",
    name: "Dell XPS 15 Laptop",
    category: "Hardware",
    unit: "unit",
    price: 1200,
    tax: 18,
    cost: 820,
    description: "15-inch business laptop with Intel i7, 16GB RAM, 512GB SSD",
    status: "Active",
    stock: 12,
    subscription: false
  },
  {
    id: "prod-2",
    sku: "LAP-HP-001",
    name: "HP EliteBook 840",
    category: "Hardware",
    unit: "unit",
    price: 950,
    tax: 18,
    cost: 650,
    description: "14-inch business laptop, Intel i5, 8GB RAM, 256GB SSD",
    status: "Active",
    stock: 8,
    subscription: false
  },
  {
    id: "prod-3",
    sku: "MON-DELL-001",
    name: "Dell 27-inch Monitor",
    category: "Hardware",
    unit: "unit",
    price: 450,
    tax: 18,
    cost: 300,
    description: "27-inch 4K UHD monitor with USB-C",
    status: "Active",
    stock: 15,
    subscription: false
  },
  {
    id: "prod-4",
    sku: "DOCK-DELL-001",
    name: "Dell Docking Station",
    category: "Hardware",
    unit: "unit",
    price: 165,
    tax: 18,
    cost: 95,
    description: "Universal USB-C docking station with dual display support",
    status: "Active",
    stock: 20,
    subscription: false
  },
  {
    id: "prod-5",
    sku: "SVC-INSTALL-001",
    name: "Setup & Onboarding Service",
    category: "Services",
    unit: "hour",
    price: 450,
    tax: 18,
    cost: 300,
    description: "Professional setup, configuration, and onboarding",
    status: "Active",
    stock: 999,
    subscription: false
  },
  {
    id: "prod-6",
    sku: "SVC-WARRANTY-001",
    name: "Extended Warranty - 3 Year",
    category: "Services",
    unit: "year",
    price: 240,
    tax: 18,
    cost: 120,
    description: "3-year extended warranty with next-day support",
    status: "Active",
    stock: 999,
    subscription: false
  },
  {
    id: "prod-7",
    sku: "SUB-SUPPORT-001",
    name: "24/7 Premium Support Plan",
    category: "Subscriptions",
    unit: "month",
    price: 99,
    tax: 18,
    cost: 40,
    description: "24x7 priority support with 4-hour response time",
    status: "Active",
    stock: 999,
    subscription: true
  },
  {
    id: "prod-8",
    sku: "SUB-ANALYTICS-001",
    name: "Analytics & Reporting Add-on",
    category: "Subscriptions",
    unit: "year",
    price: 590,
    tax: 18,
    cost: 180,
    description: "Advanced analytics and custom reporting dashboard",
    status: "Active",
    stock: 999,
    subscription: true
  },
  {
    id: "prod-9",
    sku: "SVC-SECURITY-001",
    name: "Enterprise Security Bundle",
    category: "Services",
    unit: "unit",
    price: 250,
    tax: 18,
    cost: 150,
    description: "Advanced security, compliance, and monitoring service",
    status: "Inactive",
    stock: 0,
    subscription: false
  },
  {
    id: "prod-10",
    sku: "LAP-MAC-001",
    name: "MacBook Pro 14-inch",
    category: "Hardware",
    unit: "unit",
    price: 1999,
    tax: 18,
    cost: 1400,
    description: "Apple M3 Pro chip, 18GB RAM, 512GB SSD",
    status: "Active",
    stock: 5,
    subscription: false
  }
];

// ==================== 4. CUSTOMERS ====================
export const MOCK_CUSTOMERS = [
  {
    id: "cust-1",
    name: "Acme Corporation",
    contactEmail: "acme@acme.com",
    phone: "+1-555-0101",
    tier: "Gold",
    currency: "USD",
    status: "Active",
    totalQuotations: 2,
    activeOrders: 1,
    revenue: 30520,
    address: "123 Business Ave, New York, NY 10001"
  },
  {
    id: "cust-2",
    name: "Beta Industries",
    contactEmail: "info@betaindustries.com",
    phone: "+1-555-0102",
    tier: "Silver",
    currency: "USD",
    status: "Active",
    totalQuotations: 1,
    activeOrders: 0,
    revenue: 9120,
    address: "456 Corporate Dr, Chicago, IL 60601"
  },
  {
    id: "cust-3",
    name: "Northwind Traders",
    contactEmail: "hello@northwind.com",
    phone: "+1-555-0103",
    tier: "Bronze",
    currency: "USD",
    status: "Active",
    totalQuotations: 1,
    activeOrders: 0,
    revenue: 14060,
    address: "789 Trade St, Dallas, TX 75201"
  },
  {
    id: "cust-4",
    name: "Globex Enterprises",
    contactEmail: "procurement@globex.com",
    phone: "+1-555-0104",
    tier: "Gold",
    currency: "USD",
    status: "Active",
    totalQuotations: 1,
    activeOrders: 1,
    revenue: 40462.5,
    address: "321 Global Blvd, San Francisco, CA 94105"
  },
  {
    id: "cust-5",
    name: "TechCorp Solutions",
    contactEmail: "sales@techcorp.com",
    phone: "+1-555-0105",
    tier: "Silver",
    currency: "USD",
    status: "Active",
    totalQuotations: 1,
    activeOrders: 0,
    revenue: 17020,
    address: "654 Tech Park, Austin, TX 78701"
  },
  {
    id: "cust-6",
    name: "Inactive Customer",
    contactEmail: "old@company.com",
    phone: "+1-555-0106",
    tier: "Bronze",
    currency: "USD",
    status: "Inactive",
    totalQuotations: 0,
    activeOrders: 0,
    revenue: 0,
    address: "987 Old Rd, Denver, CO 80201"
  }
];

// ==================== 5. DISCOUNT RULES ====================
export const MOCK_DISCOUNT_RULES = [
  { id: "rule-1", tier: "Bronze", category: "Hardware", ceiling: 5, approvalChain: "Sales Manager" },
  { id: "rule-2", tier: "Bronze", category: "Services", ceiling: 5, approvalChain: "Sales Manager" },
  { id: "rule-3", tier: "Bronze", category: "Subscriptions", ceiling: 5, approvalChain: "Sales Manager" },
  { id: "rule-4", tier: "Silver", category: "Hardware", ceiling: 10, approvalChain: "Sales Manager" },
  { id: "rule-5", tier: "Silver", category: "Services", ceiling: 8, approvalChain: "Sales Manager" },
  { id: "rule-6", tier: "Silver", category: "Subscriptions", ceiling: 10, approvalChain: "Sales Manager" },
  { id: "rule-7", tier: "Gold", category: "Hardware", ceiling: 15, approvalChain: "Sales Manager" },
  { id: "rule-8", tier: "Gold", category: "Services", ceiling: 10, approvalChain: "Finance" },
  { id: "rule-9", tier: "Gold", category: "Subscriptions", ceiling: 12, approvalChain: "Finance" }
];

// ==================== 6. WAREHOUSES ====================
export const MOCK_WAREHOUSES = [
  {
    id: "wh-1",
    name: "Main Warehouse",
    location: "Ahmedabad, IN",
    stockLevel: "Healthy",
    shippingWeight: 1,
    status: "Active",
    products: 8,
    totalStock: 1050,
    lowStockItems: 0
  },
  {
    id: "wh-2",
    name: "East Depot",
    location: "Mumbai, IN",
    stockLevel: "Low on hardware",
    shippingWeight: 1.4,
    status: "Active",
    products: 6,
    totalStock: 20,
    lowStockItems: 2
  },
  {
    id: "wh-3",
    name: "North Distribution Center",
    location: "Delhi, IN",
    stockLevel: "Healthy",
    shippingWeight: 1.2,
    status: "Active",
    products: 5,
    totalStock: 30,
    lowStockItems: 0
  }
];

// ==================== 7. INVENTORY ====================
export const MOCK_INVENTORY = [
  { id: "inv-1", productName: "Dell XPS 15 Laptop", warehouseName: "Main Warehouse", quantity: 12, reserved: 3, reorderLevel: 5, status: "In Stock", updatedAt: "2026-09-06T09:00:00Z" },
  { id: "inv-2", productName: "Dell XPS 15 Laptop", warehouseName: "East Depot", quantity: 5, reserved: 1, reorderLevel: 3, status: "In Stock", updatedAt: "2026-09-06T08:00:00Z" },
  { id: "inv-3", productName: "Dell XPS 15 Laptop", warehouseName: "North Distribution Center", quantity: 2, reserved: 0, reorderLevel: 3, status: "Low Stock", updatedAt: "2026-09-05T16:00:00Z" },
  { id: "inv-4", productName: "HP EliteBook 840", warehouseName: "Main Warehouse", quantity: 8, reserved: 2, reorderLevel: 5, status: "In Stock", updatedAt: "2026-09-06T09:00:00Z" },
  { id: "inv-5", productName: "HP EliteBook 840", warehouseName: "East Depot", quantity: 3, reserved: 0, reorderLevel: 3, status: "Low Stock", updatedAt: "2026-09-05T14:00:00Z" },
  { id: "inv-6", productName: "HP EliteBook 840", warehouseName: "North Distribution Center", quantity: 4, reserved: 1, reorderLevel: 3, status: "In Stock", updatedAt: "2026-09-06T10:00:00Z" },
  { id: "inv-7", productName: "Dell 27-inch Monitor", warehouseName: "Main Warehouse", quantity: 15, reserved: 5, reorderLevel: 10, status: "In Stock", updatedAt: "2026-09-06T09:00:00Z" },
  { id: "inv-8", productName: "Dell 27-inch Monitor", warehouseName: "East Depot", quantity: 7, reserved: 2, reorderLevel: 5, status: "In Stock", updatedAt: "2026-09-05T15:00:00Z" },
  { id: "inv-9", productName: "Dell 27-inch Monitor", warehouseName: "North Distribution Center", quantity: 10, reserved: 3, reorderLevel: 5, status: "In Stock", updatedAt: "2026-09-06T08:00:00Z" },
  { id: "inv-10", productName: "Dell Docking Station", warehouseName: "Main Warehouse", quantity: 20, reserved: 4, reorderLevel: 10, status: "In Stock", updatedAt: "2026-09-06T09:00:00Z" },
  { id: "inv-11", productName: "Dell Docking Station", warehouseName: "East Depot", quantity: 3, reserved: 0, reorderLevel: 5, status: "Low Stock", updatedAt: "2026-09-04T11:00:00Z" },
  { id: "inv-12", productName: "Dell Docking Station", warehouseName: "North Distribution Center", quantity: 5, reserved: 1, reorderLevel: 5, status: "Low Stock", updatedAt: "2026-09-05T13:00:00Z" },
  { id: "inv-13", productName: "MacBook Pro 14-inch", warehouseName: "Main Warehouse", quantity: 3, reserved: 1, reorderLevel: 3, status: "Low Stock", updatedAt: "2026-09-06T07:00:00Z" },
  { id: "inv-14", productName: "MacBook Pro 14-inch", warehouseName: "East Depot", quantity: 2, reserved: 0, reorderLevel: 3, status: "Low Stock", updatedAt: "2026-09-05T12:00:00Z" },
  { id: "inv-15", productName: "Setup & Onboarding Service", warehouseName: "Main Warehouse", quantity: 999, reserved: 0, reorderLevel: 100, status: "In Stock", updatedAt: "2026-09-01T10:00:00Z" },
  { id: "inv-16", productName: "Extended Warranty - 3 Year", warehouseName: "Main Warehouse", quantity: 999, reserved: 0, reorderLevel: 100, status: "In Stock", updatedAt: "2026-09-01T10:00:00Z" }
];

// ==================== 8. SUBSCRIPTION PLANS ====================
export const MOCK_SUBSCRIPTION_PLANS = [
  {
    id: "plan-1",
    name: "24/7 Premium Support",
    cadence: "Monthly",
    price: 99,
    prorationRule: "Daily proration",
    cancellationRule: "Full refund within 30 days",
    status: "Active",
    products: ["24/7 Premium Support Plan"]
  },
  {
    id: "plan-2",
    name: "Analytics & Reporting Add-on",
    cadence: "Yearly",
    price: 590,
    prorationRule: "Daily proration",
    cancellationRule: "Partial refund for unused months",
    status: "Active",
    products: ["Analytics & Reporting Add-on"]
  },
  {
    id: "plan-3",
    name: "Enterprise Security Bundle",
    cadence: "Quarterly",
    price: 250,
    prorationRule: "No proration",
    cancellationRule: "Non-refundable after 7 days",
    status: "Inactive",
    products: ["Enterprise Security Bundle"]
  }
];

// ==================== 9. UPSELL RULES ====================
export const MOCK_UPSELL_RULES = [
  {
    id: "upsell-1",
    baseProduct: "Dell XPS 15 Laptop",
    suggestedProduct: "Extended Warranty - 3 Year",
    ruleType: "Upsell",
    promotion: "Summer Sale",
    minimumMargin: 15,
    priority: 1,
    status: "Active"
  },
  {
    id: "upsell-2",
    baseProduct: "Dell XPS 15 Laptop",
    suggestedProduct: "Dell Docking Station",
    ruleType: "Cross-sell",
    promotion: null,
    minimumMargin: 12,
    priority: 2,
    status: "Active"
  },
  {
    id: "upsell-3",
    baseProduct: "HP EliteBook 840",
    suggestedProduct: "Dell 27-inch Monitor",
    ruleType: "Cross-sell",
    promotion: null,
    minimumMargin: 10,
    priority: 3,
    status: "Active"
  },
  {
    id: "upsell-4",
    baseProduct: "Setup & Onboarding Service",
    suggestedProduct: "24/7 Premium Support Plan",
    ruleType: "Cross-sell",
    promotion: "Bundle Deal",
    minimumMargin: 20,
    priority: 1,
    status: "Active"
  },
  {
    id: "upsell-5",
    baseProduct: "MacBook Pro 14-inch",
    suggestedProduct: "Extended Warranty - 3 Year",
    ruleType: "Upsell",
    promotion: "New Arrival",
    minimumMargin: 18,
    priority: 1,
    status: "Inactive"
  },
  {
    id: "upsell-6",
    baseProduct: "Dell 27-inch Monitor",
    suggestedProduct: "Dell Docking Station",
    ruleType: "Cross-sell",
    promotion: null,
    minimumMargin: 8,
    priority: 4,
    status: "Active"
  }
];