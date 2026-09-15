// ==================== SAMPLE DATA ====================

// ==================== CUSTOMERS ====================
export const SAMPLE_CUSTOMERS = [
  {
    id: "cust-1",
    name: "Acme Corporation",
    contactEmail: "acme@acme.com",
    phone: "+1-555-0101",
    tier: "Gold",
    currency: "USD",
    status: "Active",
    totalQuotations: 3,
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
    totalQuotations: 2,
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
  }
];

// ==================== QUOTATIONS ====================
export const SAMPLE_QUOTATIONS = [
  {
    id: "quo-1",
    customerName: "Acme Corporation",
    customerTier: "Gold",
    total: 22520,
    stage: "Draft",
    rep: "Sales User",
    updatedAt: "2026-09-06T09:00:00Z",
    riskScore: 68,
    riskLevel: "HIGH",
    discount: 18,
    items: 3,
    versionNumber: 1
  },
  {
    id: "quo-2",
    customerName: "Beta Industries",
    customerTier: "Silver",
    total: 9120,
    stage: "Pending Approval",
    rep: "Sales User",
    updatedAt: "2026-09-05T14:00:00Z",
    riskScore: 45,
    riskLevel: "MEDIUM",
    discount: 15,
    items: 2,
    versionNumber: 1
  },
  {
    id: "quo-3",
    customerName: "Northwind Traders",
    customerTier: "Bronze",
    total: 14060,
    stage: "Under Negotiation",
    rep: "Sales User",
    updatedAt: "2026-09-04T16:00:00Z",
    riskScore: 52,
    riskLevel: "MEDIUM",
    discount: 20,
    items: 2,
    versionNumber: 2
  },
  {
    id: "quo-4",
    customerName: "Globex Enterprises",
    customerTier: "Gold",
    total: 40462.5,
    stage: "Confirmed",
    rep: "Sales User",
    updatedAt: "2026-09-04T11:00:00Z",
    riskScore: 28,
    riskLevel: "LOW",
    discount: 10,
    items: 2,
    versionNumber: 1
  },
  {
    id: "quo-5",
    customerName: "TechCorp Solutions",
    customerTier: "Silver",
    total: 17020,
    stage: "Approved",
    rep: "Sales User",
    updatedAt: "2026-09-03T15:00:00Z",
    riskScore: 35,
    riskLevel: "MEDIUM",
    discount: 15,
    items: 2,
    versionNumber: 1
  },
  {
    id: "quo-6",
    customerName: "Acme Corporation",
    customerTier: "Gold",
    total: 7995,
    stage: "Draft",
    rep: "Sales User",
    updatedAt: "2026-09-03T10:00:00Z",
    riskScore: 15,
    riskLevel: "LOW",
    discount: 8,
    items: 2,
    versionNumber: 1
  },
  {
    id: "quo-7",
    customerName: "Acme Corporation",
    customerTier: "Gold",
    total: 31200,
    stage: "Pending Approval",
    rep: "Sales User",
    updatedAt: "2026-09-06T11:00:00Z",
    riskScore: 72,
    riskLevel: "HIGH",
    discount: 22,
    items: 4,
    versionNumber: 1
  },
  {
    id: "quo-8",
    customerName: "Beta Industries",
    customerTier: "Silver",
    total: 18450,
    stage: "Under Negotiation",
    rep: "Sales User",
    updatedAt: "2026-09-05T09:00:00Z",
    riskScore: 58,
    riskLevel: "MEDIUM",
    discount: 18,
    items: 3,
    versionNumber: 2
  }
];

// ==================== CUSTOMER QUOTATIONS (Only Acme Corporation) ====================
export const SAMPLE_CUSTOMER_QUOTATIONS = SAMPLE_QUOTATIONS.filter(
  q => q.customerName === "Acme Corporation"
);

// ==================== PRODUCTS ====================
export const SAMPLE_PRODUCTS = [
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

// ==================== USERS ====================
export const SAMPLE_USERS = [
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
  }
];

// ==================== WAREHOUSES ====================
export const SAMPLE_WAREHOUSES = [
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

// ==================== INVENTORY ====================
export const SAMPLE_INVENTORY = [
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

// ==================== SALES TREND ====================
export const SAMPLE_SALES_TREND = [
  { label: "Mon", value: 12400 },
  { label: "Tue", value: 15800 },
  { label: "Wed", value: 11200 },
  { label: "Thu", value: 19600 },
  { label: "Fri", value: 21500 },
  { label: "Sat", value: 9800 },
  { label: "Sun", value: 7600 }
];

// ==================== DEAL HEALTH TREND ====================
export const SAMPLE_DEAL_HEALTH_TREND = [
  { label: "W1", value: 4 },
  { label: "W2", value: 6 },
  { label: "W3", value: 3 },
  { label: "W4", value: 8 }
];

// ==================== STALLED DEALS ====================
export const SAMPLE_STALLED_DEALS = [
  { id: "quo-4", customerName: "Globex Enterprises", total: 40462.5, idleDays: 12 },
  { id: "quo-5", customerName: "TechCorp Solutions", total: 17020, idleDays: 6 }
];

// ==================== DISCOUNT ANOMALIES ====================
export const SAMPLE_DISCOUNT_ANOMALIES = [
  { id: "anom-1", repName: "Sales User", discountGiven: 18, repAverage: 9, quotationId: "quo-1" },
  { id: "anom-2", repName: "Sales User", discountGiven: 22, repAverage: 9, quotationId: "quo-7" }
];

// ==================== APPROVALS ====================
export const SAMPLE_APPROVALS = [
  {
    id: "quo-1",
    customerName: "Acme Corporation",
    rep: "Sales User",
    total: 22520,
    discount: 18,
    riskScore: 68,
    riskLevel: "HIGH",
    status: "Pending",
    submittedAt: "2026-09-06T09:00:00Z",
    category: "Services",
    items: 3,
    customerTier: "Gold",
    violations: [
      { rule: "Services category limit", allowed: 10, requested: 18, difference: 8 }
    ]
  },
  {
    id: "quo-7",
    customerName: "Acme Corporation",
    rep: "Sales User",
    total: 31200,
    discount: 22,
    riskScore: 72,
    riskLevel: "HIGH",
    status: "Pending",
    submittedAt: "2026-09-06T11:00:00Z",
    category: "Hardware",
    items: 4,
    customerTier: "Gold",
    violations: [
      { rule: "Hardware category limit", allowed: 15, requested: 22, difference: 7 }
    ]
  },
  {
    id: "quo-2",
    customerName: "Beta Industries",
    rep: "Sales User",
    total: 9120,
    discount: 15,
    riskScore: 45,
    riskLevel: "MEDIUM",
    status: "Pending",
    submittedAt: "2026-09-05T14:00:00Z",
    category: "Hardware",
    items: 2,
    customerTier: "Silver",
    violations: [
      { rule: "Hardware category limit", allowed: 10, requested: 15, difference: 5 }
    ]
  }
];