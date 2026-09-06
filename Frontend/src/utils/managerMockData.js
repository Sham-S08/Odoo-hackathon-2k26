// ==================== MANAGER MOCK DATA ====================

// ==================== 1. DASHBOARD ====================
export const MOCK_MANAGER_DASHBOARD = {
  // KPI Cards
  stats: {
    pendingApprovals: 3,
    highRiskDeals: 2,
    criticalDeals: 0,
    negotiations: 1
  },
  // Approval Summary
  approvalSummary: {
    pendingManager: 3,
    pendingFinance: 0,
    approvedToday: 2,
    rejectedToday: 0
  },
  // Risk Distribution
  riskDistribution: [
    { level: "Low", count: 2, color: "emerald" },
    { level: "Medium", count: 2, color: "amber" },
    { level: "High", count: 2, color: "rose" },
    { level: "Critical", count: 0, color: "red" }
  ],
  // Deal Health Alerts
  alerts: [
    {
      id: 1,
      type: "discount_anomaly",
      title: "High discount anomaly detected",
      description: "Sales User gave 18% discount vs 12% average",
      quotationId: "quo-1",
      severity: "high"
    },
    {
      id: 2,
      type: "risk",
      title: "Blended risk score exceeded threshold",
      description: "Acme Corporation — Risk score 68/100",
      quotationId: "quo-1",
      severity: "medium"
    },
    {
      id: 3,
      type: "negotiation",
      title: "Customer negotiation pending",
      description: "Northwind Traders requested 20% discount",
      quotationId: "quo-3",
      severity: "medium"
    }
  ]
};

// ==================== 2. APPROVAL QUEUE ====================
export const MOCK_APPROVALS = [
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
  },
  {
    id: "quo-3",
    customerName: "Northwind Traders",
    rep: "Sales User",
    total: 14060,
    discount: 20,
    riskScore: 52,
    riskLevel: "MEDIUM",
    status: "Pending",
    submittedAt: "2026-09-04T16:00:00Z",
    category: "Subscriptions",
    items: 2,
    customerTier: "Bronze",
    violations: [
      { rule: "Subscriptions category limit", allowed: 5, requested: 20, difference: 15 }
    ]
  },
  {
    id: "quo-5",
    customerName: "TechCorp Solutions",
    rep: "Sales User",
    total: 17020,
    discount: 15,
    riskScore: 35,
    riskLevel: "MEDIUM",
    status: "Approved",
    submittedAt: "2026-09-03T15:00:00Z",
    category: "Hardware",
    items: 2,
    customerTier: "Silver",
    violations: [],
    approvedBy: "You",
    approvedAt: "2026-09-03T16:00:00Z"
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
    violations: [],
    approvedBy: "You",
    approvedAt: "2026-09-04T12:00:00Z"
  }
];

// ==================== 3. APPROVAL DETAIL (Single Approval) ====================
export const MOCK_APPROVAL_DETAIL = {
  id: "quo-1",
  customerName: "Acme Corporation",
  customerTier: "Gold",
  rep: "Sales User",
  createdDate: "2026-09-06T09:00:00Z",
  total: 22520,
  discountTotal: 4120,
  riskScore: 68,
  riskLevel: "HIGH",
  status: "Pending",
  items: [
    { product: "Dell XPS 15 Laptop", category: "Hardware", basePrice: 1200, discount: 12, allowed: 15, variance: 0 },
    { product: "Setup & Onboarding Service", category: "Services", basePrice: 450, discount: 18, allowed: 10, variance: 8 },
    { product: "24/7 Premium Support Plan", category: "Subscriptions", basePrice: 99, discount: 5, allowed: 12, variance: 0 }
  ],
  violations: [
    { rule: "Services category limit", allowed: 10, requested: 18, difference: 8, severity: "high" },
    { rule: "Gold customer tier limit", allowed: 15, requested: 18, difference: 3, severity: "medium" }
  ],
  approvalChain: [
    { step: "Sales Rep", status: "completed", user: "Sales User", timestamp: "2026-09-06T09:00:00Z" },
    { step: "Sales Manager", status: "current", user: "You", timestamp: null },
    { step: "Finance / Operations", status: "pending", user: null, timestamp: null },
    { step: "Customer Confirmation", status: "pending", user: null, timestamp: null }
  ],
  auditTrail: [
    { user: "Sales User", action: "created quotation", timestamp: "2026-09-06T09:00:00Z" },
    { user: "Sales User", action: "applied 18% discount to Setup Service", timestamp: "2026-09-06T09:10:00Z" },
    { user: "System", action: "rule evaluation triggered: Services discount exceeds 10% ceiling", timestamp: "2026-09-06T09:11:00Z" },
    { user: "System", action: "deal health score generated: 68/100 (HIGH)", timestamp: "2026-09-06T09:12:00Z" },
    { user: "Sales User", action: "submitted for approval", timestamp: "2026-09-06T09:15:00Z" }
  ],
  previousVersion: {
    total: 23600,
    discount: 12,
    riskScore: 32,
    items: [
      { product: "Dell XPS 15 Laptop", quantity: 10, discount: 10 },
      { product: "Setup & Onboarding Service", quantity: 5, discount: 12 }
    ]
  },
  currentVersion: {
    total: 22520,
    discount: 18,
    riskScore: 68,
    items: [
      { product: "Dell XPS 15 Laptop", quantity: 10, discount: 12 },
      { product: "Setup & Onboarding Service", quantity: 5, discount: 18 },
      { product: "24/7 Premium Support Plan", quantity: 5, discount: 5 }
    ]
  }
};

// ==================== 4. NEGOTIATIONS ====================
export const MOCK_NEGOTIATIONS = [
  {
    id: "neg-1",
    quotationId: "quo-3",
    customerName: "Northwind Traders",
    rep: "Sales User",
    requestedDiscountPercent: 20,
    message: "Can you offer a better discount on the Analytics Add-on? We're ordering in bulk.",
    currentDiscount: 15,
    versionNumber: 2,
    createdAt: "2026-09-05T10:00:00Z",
    status: "Pending Review"
  },
  {
    id: "neg-2",
    quotationId: "quo-1",
    customerName: "Acme Corporation",
    rep: "Sales User",
    requestedDiscountPercent: 15,
    message: "We're considering a larger order. Can we get 15% off the total?",
    currentDiscount: 18,
    versionNumber: 2,
    createdAt: "2026-09-04T14:00:00Z",
    status: "Pending Review"
  }
];

// ==================== 5. DEAL HEALTH ====================
export const MOCK_DEAL_HEALTH = [
  {
    id: "quo-1",
    customerName: "Acme Corporation",
    rep: "Sales User",
    total: 22520,
    riskScore: 68,
    riskLevel: "HIGH",
    lastActivity: "2026-09-06T09:00:00Z",
    stage: "Pending Approval",
    stalled: 0
  },
  {
    id: "quo-2",
    customerName: "Beta Industries",
    rep: "Sales User",
    total: 9120,
    riskScore: 45,
    riskLevel: "MEDIUM",
    lastActivity: "2026-09-05T14:00:00Z",
    stage: "Pending Approval",
    stalled: 1
  },
  {
    id: "quo-3",
    customerName: "Northwind Traders",
    rep: "Sales User",
    total: 14060,
    riskScore: 52,
    riskLevel: "MEDIUM",
    lastActivity: "2026-09-04T16:00:00Z",
    stage: "Under Negotiation",
    stalled: 2
  },
  {
    id: "quo-5",
    customerName: "TechCorp Solutions",
    rep: "Sales User",
    total: 17020,
    riskScore: 35,
    riskLevel: "MEDIUM",
    lastActivity: "2026-09-03T15:00:00Z",
    stage: "Approved",
    stalled: 3
  },
  {
    id: "quo-4",
    customerName: "Globex Enterprises",
    rep: "Sales User",
    total: 40462.5,
    riskScore: 28,
    riskLevel: "LOW",
    lastActivity: "2026-09-04T11:00:00Z",
    stage: "Confirmed",
    stalled: 2
  }
];

// ==================== 6. DISCOUNT ANOMALIES ====================
export const MOCK_DISCOUNT_ANOMALIES = [
  {
    id: "anom-1",
    repName: "Sales User",
    customer: "Acme Corporation",
    product: "Setup & Onboarding Service",
    currentDiscount: 18,
    avgDiscount: 9,
    difference: 9,
    riskLevel: "HIGH",
    quotationId: "quo-1"
  },
  {
    id: "anom-2",
    repName: "Sales User",
    customer: "Northwind Traders",
    product: "Analytics & Reporting Add-on",
    currentDiscount: 20,
    avgDiscount: 9,
    difference: 11,
    riskLevel: "HIGH",
    quotationId: "quo-3"
  },
  {
    id: "anom-3",
    repName: "Sales User",
    customer: "Beta Industries",
    product: "HP EliteBook 840",
    currentDiscount: 15,
    avgDiscount: 9,
    difference: 6,
    riskLevel: "MEDIUM",
    quotationId: "quo-2"
  }
];