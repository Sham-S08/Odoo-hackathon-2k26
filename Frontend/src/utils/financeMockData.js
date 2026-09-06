// ==================== FINANCE MOCK DATA ====================

// ==================== 1. DASHBOARD ====================
export const MOCK_FINANCE_DASHBOARD = {
  stats: {
    pendingHighRiskApprovals: 0,
    ordersToFulfill: 3,
    pendingInvoices: 2,
    totalRevenue: 90257.5,
    backorders: 0,
    warehouseUtilization: 78
  },
  approvalOverview: {
    pendingFinance: 0,
    approved: 4,
    rejected: 1
  },
  fulfillmentOverview: {
    pending: 3,
    allocated: 2,
    fulfilled: 1,
    backordered: 0
  },
  billingOverview: {
    pendingInvoices: 2,
    paidInvoices: 2,
    overdueInvoices: 0,
    totalOutstanding: 31520
  },
  recentActivity: [
    { user: "Finance User", action: "allocated inventory", entity: "quo-1 → Main Warehouse", timestamp: "2 min ago" },
    { user: "Finance User", action: "approved high-risk discount", entity: "quo-5 for TechCorp", timestamp: "1 hour ago" },
    { user: "System", action: "generated invoice", entity: "inv-2001 for Acme Corp", timestamp: "3 hours ago" },
    { user: "Finance User", action: "confirmed shipment", entity: "quo-4 for Globex", timestamp: "5 hours ago" }
  ]
};

// ==================== 2. APPROVALS (Finance Level) ====================
export const MOCK_FINANCE_APPROVALS = [
  {
    id: "quo-5",
    customerName: "TechCorp Solutions",
    rep: "Sales User",
    total: 17020,
    discount: 15,
    riskScore: 35,
    riskLevel: "MEDIUM",
    status: "Pending",
    submittedAt: "2026-09-03T15:00:00Z",
    category: "Hardware",
    items: 2,
    customerTier: "Silver",
    reason: "Second-level approval required due to high discount volume"
  },
  {
    id: "quo-4",
    customerName: "Globex Enterprises",
    rep: "Sales User",
    total: 40462.5,
    discount: 10,
    riskScore: 28,
    riskLevel: "LOW",
    status: "Approved",
    submittedAt: "2026-09-04T11:00:00Z",
    category: "Hardware",
    items: 2,
    customerTier: "Gold",
    approvedBy: "You",
    approvedAt: "2026-09-04T13:00:00Z"
  },
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
    reason: "High risk discount requiring Finance review"
  }
];

// ==================== 3. FULFILLMENT ====================
export const MOCK_FULFILLMENT = [
  {
    id: "ord-1",
    quotationId: "quo-1",
    customerName: "Acme Corporation",
    total: 22520,
    status: "Pending Allocation",
    createdAt: "2026-09-06T09:00:00Z",
    items: [
      { product: "Dell XPS 15 Laptop", quantity: 10, allocated: 0, warehouse: null },
      { product: "Setup & Onboarding Service", quantity: 5, allocated: 0, warehouse: null },
      { product: "24/7 Premium Support Plan", quantity: 5, allocated: 0, warehouse: null }
    ]
  },
  {
    id: "ord-2",
    quotationId: "quo-2",
    customerName: "Beta Industries",
    total: 9120,
    status: "Partially Fulfilled",
    createdAt: "2026-09-05T14:00:00Z",
    items: [
      { product: "HP EliteBook 840", quantity: 8, allocated: 6, warehouse: "Main Warehouse" },
      { product: "Setup & Onboarding Service", quantity: 4, allocated: 4, warehouse: "East Depot" }
    ]
  },
  {
    id: "ord-3",
    quotationId: "quo-5",
    customerName: "TechCorp Solutions",
    total: 17020,
    status: "Pending Allocation",
    createdAt: "2026-09-03T15:00:00Z",
    items: [
      { product: "MacBook Pro 14-inch", quantity: 5, allocated: 0, warehouse: null },
      { product: "Extended Warranty - 3 Year", quantity: 5, allocated: 0, warehouse: null }
    ]
  },
  {
    id: "ord-4",
    quotationId: "quo-4",
    customerName: "Globex Enterprises",
    total: 40462.5,
    status: "Fulfilled",
    createdAt: "2026-09-04T11:00:00Z",
    items: [
      { product: "Dell XPS 15 Laptop", quantity: 15, allocated: 15, warehouse: "Main Warehouse" },
      { product: "Dell 27-inch Monitor", quantity: 10, allocated: 10, warehouse: "East Depot" }
    ]
  }
];

// ==================== 4. WAREHOUSE SPLIT (For Fulfillment Details) ====================
export const MOCK_WAREHOUSE_SPLIT = {
  orderId: "ord-1",
  customerName: "Acme Corporation",
  total: 22520,
  allocations: [
    {
      warehouseId: "wh-1",
      warehouseName: "Main Warehouse",
      quantity: 8,
      shipments: 1,
      estimatedCost: 120,
      items: [
        { product: "Dell XPS 15 Laptop", quantity: 5 },
        { product: "24/7 Premium Support Plan", quantity: 3 }
      ]
    },
    {
      warehouseId: "wh-2",
      warehouseName: "East Depot",
      quantity: 12,
      shipments: 2,
      estimatedCost: 168,
      items: [
        { product: "Dell XPS 15 Laptop", quantity: 5 },
        { product: "Setup & Onboarding Service", quantity: 5 },
        { product: "24/7 Premium Support Plan", quantity: 2 }
      ]
    }
  ],
  backorder: {
    product: "Setup & Onboarding Service",
    quantity: 2,
    warehouseName: "East Depot",
    expectedDate: "2026-09-10"
  }
};

// ==================== 5. INVENTORY (Finance View) ====================
export const MOCK_FINANCE_INVENTORY = [
  { id: "inv-1", productName: "Dell XPS 15 Laptop", warehouseName: "Main Warehouse", quantity: 12, reserved: 3, available: 9, status: "In Stock" },
  { id: "inv-2", productName: "Dell XPS 15 Laptop", warehouseName: "East Depot", quantity: 5, reserved: 1, available: 4, status: "In Stock" },
  { id: "inv-3", productName: "Dell XPS 15 Laptop", warehouseName: "North Distribution Center", quantity: 2, reserved: 0, available: 2, status: "Low Stock" },
  { id: "inv-4", productName: "HP EliteBook 840", warehouseName: "Main Warehouse", quantity: 8, reserved: 2, available: 6, status: "In Stock" },
  { id: "inv-5", productName: "HP EliteBook 840", warehouseName: "East Depot", quantity: 3, reserved: 0, available: 3, status: "Low Stock" },
  { id: "inv-6", productName: "HP EliteBook 840", warehouseName: "North Distribution Center", quantity: 4, reserved: 1, available: 3, status: "In Stock" },
  { id: "inv-7", productName: "Dell 27-inch Monitor", warehouseName: "Main Warehouse", quantity: 15, reserved: 5, available: 10, status: "In Stock" },
  { id: "inv-8", productName: "Dell 27-inch Monitor", warehouseName: "East Depot", quantity: 7, reserved: 2, available: 5, status: "In Stock" },
  { id: "inv-9", productName: "Dell Docking Station", warehouseName: "Main Warehouse", quantity: 20, reserved: 4, available: 16, status: "In Stock" },
  { id: "inv-10", productName: "Dell Docking Station", warehouseName: "East Depot", quantity: 3, reserved: 0, available: 3, status: "Low Stock" },
  { id: "inv-11", productName: "MacBook Pro 14-inch", warehouseName: "Main Warehouse", quantity: 3, reserved: 1, available: 2, status: "Low Stock" },
  { id: "inv-12", productName: "MacBook Pro 14-inch", warehouseName: "East Depot", quantity: 2, reserved: 0, available: 2, status: "Low Stock" },
  { id: "inv-13", productName: "Setup & Onboarding Service", warehouseName: "Main Warehouse", quantity: 999, reserved: 0, available: 999, status: "In Stock" },
  { id: "inv-14", productName: "Extended Warranty - 3 Year", warehouseName: "Main Warehouse", quantity: 999, reserved: 0, available: 999, status: "In Stock" }
];

// ==================== 6. BILLING ====================
export const MOCK_BILLING = {
  summary: {
    totalInvoices: 4,
    paid: 2,
    pending: 2,
    overdue: 0,
    totalOutstanding: 31520
  },
  invoices: [
    {
      id: "inv-2001",
      orderId: "ord-1",
      customerName: "Acme Corporation",
      amount: 22520,
      dueDate: "2026-09-20",
      status: "Pending",
      items: [
        { description: "Dell XPS 15 Laptop x10", amount: 12000 },
        { description: "Setup & Onboarding Service x5", amount: 2250 },
        { description: "24/7 Premium Support Plan x5", amount: 495 }
      ],
      subtotal: 22520,
      tax: 0,
      total: 22520,
      createdAt: "2026-09-06T09:00:00Z"
    },
    {
      id: "inv-2002",
      orderId: "ord-2",
      customerName: "Beta Industries",
      amount: 9120,
      dueDate: "2026-09-15",
      status: "Pending",
      items: [
        { description: "HP EliteBook 840 x8", amount: 7600 },
        { description: "Setup & Onboarding Service x4", amount: 1800 }
      ],
      subtotal: 9120,
      tax: 0,
      total: 9120,
      createdAt: "2026-09-05T14:00:00Z"
    },
    {
      id: "inv-2003",
      orderId: "ord-3",
      customerName: "TechCorp Solutions",
      amount: 17020,
      dueDate: "2026-09-10",
      status: "Paid",
      items: [
        { description: "MacBook Pro 14-inch x5", amount: 9995 },
        { description: "Extended Warranty - 3 Year x5", amount: 1200 }
      ],
      subtotal: 17020,
      tax: 0,
      total: 17020,
      createdAt: "2026-09-03T15:00:00Z",
      paidAt: "2026-09-04T10:00:00Z"
    },
    {
      id: "inv-2004",
      orderId: "ord-4",
      customerName: "Globex Enterprises",
      amount: 40462.5,
      dueDate: "2026-09-05",
      status: "Paid",
      items: [
        { description: "Dell XPS 15 Laptop x15", amount: 18000 },
        { description: "Dell 27-inch Monitor x10", amount: 4500 }
      ],
      subtotal: 40462.5,
      tax: 0,
      total: 40462.5,
      createdAt: "2026-09-04T11:00:00Z",
      paidAt: "2026-09-05T09:00:00Z"
    }
  ]
};

// ==================== 7. SUBSCRIPTION BILLING ====================
export const MOCK_SUBSCRIPTION_BILLING = {
  recurringLines: [
    {
      id: "sub-1",
      customerName: "Acme Corporation",
      planName: "24/7 Premium Support Plan",
      cadence: "Monthly",
      quantity: 5,
      unitPrice: 99,
      nextBillingDate: "2026-10-06",
      status: "Active"
    },
    {
      id: "sub-2",
      customerName: "Northwind Traders",
      planName: "Analytics & Reporting Add-on",
      cadence: "Yearly",
      quantity: 3,
      unitPrice: 590,
      nextBillingDate: "2026-09-15",
      status: "Active"
    },
    {
      id: "sub-3",
      customerName: "TechCorp Solutions",
      planName: "24/7 Premium Support Plan",
      cadence: "Monthly",
      quantity: 5,
      unitPrice: 99,
      nextBillingDate: "2026-10-03",
      status: "Active"
    }
  ],
  upcomingBilling: [
    { customer: "Northwind Traders", amount: 1770, date: "2026-09-15" },
    { customer: "TechCorp Solutions", amount: 495, date: "2026-10-03" },
    { customer: "Acme Corporation", amount: 495, date: "2026-10-06" }
  ]
};