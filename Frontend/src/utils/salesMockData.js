// ==================== SALES MOCK DATA ====================

// ==================== 1. DASHBOARD ====================
export const MOCK_SALES_DASHBOARD = {
  // KPI Cards
  stats: {
    pipelineValue: 90257.5,
    activeQuotations: 4,
    approvedQuotations: 3,
    winRate: 42
  },
  // Sales Trend
  salesTrend: [
    { label: "Mon", value: 12400 },
    { label: "Tue", value: 15800 },
    { label: "Wed", value: 11200 },
    { label: "Thu", value: 19600 },
    { label: "Fri", value: 21500 },
    { label: "Sat", value: 9800 },
    { label: "Sun", value: 7600 }
  ],
  // Recent Activity
  recentQuotations: [
    { id: "quo-1", customerName: "Acme Corporation", total: 22520, stage: "Draft", updatedAt: "2026-09-06T09:00:00Z" },
    { id: "quo-2", customerName: "Beta Industries", total: 9120, stage: "Pending Approval", updatedAt: "2026-09-05T14:00:00Z" },
    { id: "quo-3", customerName: "Northwind Traders", total: 14060, stage: "Under Negotiation", updatedAt: "2026-09-04T16:00:00Z" },
    { id: "quo-6", customerName: "Acme Corporation", total: 7995, stage: "Draft", updatedAt: "2026-09-03T10:00:00Z" }
  ]
};

// ==================== 2. QUOTATIONS LIST ====================
export const MOCK_QUOTATIONS = [
  {
    id: "quo-1",
    customerName: "Acme Corporation",
    customerTier: "Gold",
    total: 22520,
    stage: "Draft",
    rep: "Sales User",
    updatedAt: "2026-09-06T09:00:00Z",
    items: 3,
    discount: 4120,
    riskScore: 68,
    riskLevel: "HIGH"
  },
  {
    id: "quo-2",
    customerName: "Beta Industries",
    customerTier: "Silver",
    total: 9120,
    stage: "Pending Approval",
    rep: "Sales User",
    updatedAt: "2026-09-05T14:00:00Z",
    items: 2,
    discount: 1200,
    riskScore: 45,
    riskLevel: "MEDIUM"
  },
  {
    id: "quo-3",
    customerName: "Northwind Traders",
    customerTier: "Bronze",
    total: 14060,
    stage: "Under Negotiation",
    rep: "Sales User",
    updatedAt: "2026-09-04T16:00:00Z",
    items: 2,
    discount: 2280,
    riskScore: 52,
    riskLevel: "MEDIUM"
  },
  {
    id: "quo-4",
    customerName: "Globex Enterprises",
    customerTier: "Gold",
    total: 40462.5,
    stage: "Confirmed",
    rep: "Sales User",
    updatedAt: "2026-09-04T11:00:00Z",
    items: 2,
    discount: 4150,
    riskScore: 28,
    riskLevel: "LOW"
  },
  {
    id: "quo-5",
    customerName: "TechCorp Solutions",
    customerTier: "Silver",
    total: 17020,
    stage: "Approved",
    rep: "Sales User",
    updatedAt: "2026-09-03T15:00:00Z",
    items: 2,
    discount: 2760,
    riskScore: 35,
    riskLevel: "MEDIUM"
  },
  {
    id: "quo-6",
    customerName: "Acme Corporation",
    customerTier: "Gold",
    total: 7995,
    stage: "Draft",
    rep: "Sales User",
    updatedAt: "2026-09-03T10:00:00Z",
    items: 2,
    discount: 820,
    riskScore: 15,
    riskLevel: "LOW"
  }
];

// ==================== 3. QUOTATION DETAIL (For Viewing Single Quotation) ====================
export const MOCK_QUOTATION_DETAIL = {
  id: "quo-1",
  customerName: "Acme Corporation",
  customerTier: "Gold",
  rep: "Sales User",
  status: "Draft",
  versionNumber: 1,
  createdAt: "2026-09-06T09:00:00Z",
  updatedAt: "2026-09-06T09:00:00Z",
  notes: "Initial quote for Acme Corp hardware upgrade",
  subtotal: 24800,
  discountTotal: 4120,
  taxTotal: 1840,
  total: 22520,
  riskScore: 68,
  riskLevel: "HIGH",
  items: [
    { 
      id: "qitem-1",
      productId: "prod-1",
      name: "Dell XPS 15 Laptop", 
      category: "Hardware", 
      quantity: 10, 
      unitPrice: 1200, 
      discountPercent: 12, 
      discountAmount: 1440,
      taxRate: 18,
      taxAmount: 1900.8,
      lineTotal: 12460.8
    },
    { 
      id: "qitem-2",
      productId: "prod-5",
      name: "Setup & Onboarding Service", 
      category: "Services", 
      quantity: 5, 
      unitPrice: 450, 
      discountPercent: 18, 
      discountAmount: 405,
      taxRate: 18,
      taxAmount: 332.1,
      lineTotal: 2177.1
    },
    { 
      id: "qitem-3",
      productId: "prod-7",
      name: "24/7 Premium Support Plan", 
      category: "Subscriptions", 
      quantity: 5, 
      unitPrice: 99, 
      discountPercent: 5, 
      discountAmount: 24.75,
      taxRate: 18,
      taxAmount: 83.16,
      lineTotal: 545.16
    }
  ],
  approvalSteps: [
    { name: "Sales Rep", status: "completed", user: "Sales User", timestamp: "2026-09-06T09:00:00Z" },
    { name: "Sales Manager", status: "current", user: null, timestamp: null },
    { name: "Finance / Operations", status: "pending", user: null, timestamp: null },
    { name: "Customer Confirmation", status: "pending", user: null, timestamp: null }
  ],
  auditTrail: [
    { user: "Sales User", action: "created quotation", timestamp: "2026-09-06T09:00:00Z" },
    { user: "Sales User", action: "added 10x Dell XPS 15 Laptop", timestamp: "2026-09-06T09:05:00Z" },
    { user: "Sales User", action: "applied 18% discount to Setup Service", timestamp: "2026-09-06T09:10:00Z" }
  ],
  fulfillment: {
    status: "Not Started",
    shipmentCount: 0
  }
};

// ==================== 4. QUOTATION BUILDER — Products ====================
export const MOCK_BUILDER_PRODUCTS = [
  {
    id: "prod-1",
    name: "Dell XPS 15 Laptop",
    category: "Hardware",
    price: 1200,
    cost: 820,
    description: "15-inch business laptop with Intel i7, 16GB RAM, 512GB SSD",
    stock: 12
  },
  {
    id: "prod-2",
    name: "HP EliteBook 840",
    category: "Hardware",
    price: 950,
    cost: 650,
    description: "14-inch business laptop, Intel i5, 8GB RAM, 256GB SSD",
    stock: 8
  },
  {
    id: "prod-3",
    name: "Dell 27-inch Monitor",
    category: "Hardware",
    price: 450,
    cost: 300,
    description: "27-inch 4K UHD monitor with USB-C",
    stock: 15
  },
  {
    id: "prod-4",
    name: "Dell Docking Station",
    category: "Hardware",
    price: 165,
    cost: 95,
    description: "Universal USB-C docking station with dual display support",
    stock: 20
  },
  {
    id: "prod-5",
    name: "Setup & Onboarding Service",
    category: "Services",
    price: 450,
    cost: 300,
    description: "Professional setup, configuration, and onboarding",
    stock: 999
  },
  {
    id: "prod-6",
    name: "Extended Warranty - 3 Year",
    category: "Services",
    price: 240,
    cost: 120,
    description: "3-year extended warranty with next-day support",
    stock: 999
  },
  {
    id: "prod-7",
    name: "24/7 Premium Support Plan",
    category: "Subscriptions",
    price: 99,
    cost: 40,
    description: "24x7 priority support with 4-hour response time",
    stock: 999
  },
  {
    id: "prod-8",
    name: "Analytics & Reporting Add-on",
    category: "Subscriptions",
    price: 590,
    cost: 180,
    description: "Advanced analytics and custom reporting dashboard",
    stock: 999
  },
  {
    id: "prod-10",
    name: "MacBook Pro 14-inch",
    category: "Hardware",
    price: 1999,
    cost: 1400,
    description: "Apple M3 Pro chip, 18GB RAM, 512GB SSD",
    stock: 5
  }
];

// ==================== 5. QUOTATION BUILDER — Customers ====================
export const MOCK_BUILDER_CUSTOMERS = [
  {
    id: "cust-1",
    name: "Acme Corporation",
    tier: "Gold",
    contactEmail: "acme@acme.com",
    currency: "USD"
  },
  {
    id: "cust-2",
    name: "Beta Industries",
    tier: "Silver",
    contactEmail: "info@betaindustries.com",
    currency: "USD"
  },
  {
    id: "cust-3",
    name: "Northwind Traders",
    tier: "Bronze",
    contactEmail: "hello@northwind.com",
    currency: "USD"
  },
  {
    id: "cust-4",
    name: "Globex Enterprises",
    tier: "Gold",
    contactEmail: "procurement@globex.com",
    currency: "USD"
  },
  {
    id: "cust-5",
    name: "TechCorp Solutions",
    tier: "Silver",
    contactEmail: "sales@techcorp.com",
    currency: "USD"
  }
];

// ==================== 6. AI SUGGESTIONS (For Quotation Builder) ====================
export const MOCK_AI_SUGGESTIONS = [
  {
    productId: "prod-6",
    name: "Extended Warranty - 3 Year",
    category: "Services",
    unitPrice: 240,
    marginDelta: 96,
    promoted: true,
    reason: "Customers buying laptops often add warranty protection"
  },
  {
    productId: "prod-4",
    name: "Dell Docking Station",
    category: "Hardware",
    unitPrice: 165,
    marginDelta: 58,
    promoted: false,
    reason: "Popular accessory for laptop users"
  },
  {
    productId: "prod-7",
    name: "24/7 Premium Support Plan",
    category: "Subscriptions",
    unitPrice: 99,
    marginDelta: 40,
    promoted: false,
    reason: "Recurring revenue opportunity with high retention"
  }
];

// ==================== 7. PIPELINE VIEW (Kanban) ====================
export const MOCK_PIPELINE = {
  columns: [
    {
      id: "draft",
      title: "Draft",
      color: "blue",
      items: [
        { id: "quo-1", customerName: "Acme Corporation", total: 22520, rep: "Sales User" },
        { id: "quo-6", customerName: "Acme Corporation", total: 7995, rep: "Sales User" }
      ]
    },
    {
      id: "pending",
      title: "Pending Approval",
      color: "amber",
      items: [
        { id: "quo-2", customerName: "Beta Industries", total: 9120, rep: "Sales User" }
      ]
    },
    {
      id: "negotiation",
      title: "Under Negotiation",
      color: "purple",
      items: [
        { id: "quo-3", customerName: "Northwind Traders", total: 14060, rep: "Sales User" }
      ]
    },
    {
      id: "approved",
      title: "Approved",
      color: "green",
      items: [
        { id: "quo-5", customerName: "TechCorp Solutions", total: 17020, rep: "Sales User" }
      ]
    },
    {
      id: "confirmed",
      title: "Confirmed",
      color: "emerald",
      items: [
        { id: "quo-4", customerName: "Globex Enterprises", total: 40462.5, rep: "Sales User" }
      ]
    }
  ]
};