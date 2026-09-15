// ==================== SUBSCRIPTION PLANS MOCK DATA ====================

export const MOCK_SUBSCRIPTION_PLANS = [
  {
    id: "plan-1",
    name: "24/7 Premium Support",
    cadence: "Monthly",
    price: 99,
    prorationRule: "Daily proration",
    cancellationRule: "Full refund within 30 days",
    status: "Active",
    products: ["24/7 Premium Support Plan"],
    description: "24x7 priority support with 4-hour response time",
    billingInterval: 1,
    billingUnit: "month",
    createdAt: "2026-09-01T10:00:00Z",
    updatedAt: "2026-09-01T10:00:00Z"
  },
  {
    id: "plan-2",
    name: "Analytics & Reporting Add-on",
    cadence: "Yearly",
    price: 590,
    prorationRule: "Daily proration",
    cancellationRule: "Partial refund for unused months",
    status: "Active",
    products: ["Analytics & Reporting Add-on"],
    description: "Advanced analytics and custom reporting dashboard",
    billingInterval: 1,
    billingUnit: "year",
    createdAt: "2026-09-01T10:00:00Z",
    updatedAt: "2026-09-01T10:00:00Z"
  },
  {
    id: "plan-3",
    name: "Enterprise Security Bundle",
    cadence: "Quarterly",
    price: 250,
    prorationRule: "No proration",
    cancellationRule: "Non-refundable after 7 days",
    status: "Inactive",
    products: ["Enterprise Security Bundle"],
    description: "Advanced security, compliance, and monitoring service",
    billingInterval: 3,
    billingUnit: "month",
    createdAt: "2026-09-01T10:00:00Z",
    updatedAt: "2026-09-01T10:00:00Z"
  },
  {
    id: "plan-4",
    name: "Starter Support Plan",
    cadence: "Monthly",
    price: 49,
    prorationRule: "Daily proration",
    cancellationRule: "Full refund within 14 days",
    status: "Active",
    products: ["Starter Support Plan"],
    description: "Basic support with 24-hour response time",
    billingInterval: 1,
    billingUnit: "month",
    createdAt: "2026-09-01T10:00:00Z",
    updatedAt: "2026-09-01T10:00:00Z"
  },
  {
    id: "plan-5",
    name: "Data Backup & Recovery",
    cadence: "Monthly",
    price: 149,
    prorationRule: "Daily proration",
    cancellationRule: "Full refund within 30 days",
    status: "Active",
    products: ["Data Backup & Recovery"],
    description: "Automated backup and disaster recovery service",
    billingInterval: 1,
    billingUnit: "month",
    createdAt: "2026-09-01T10:00:00Z",
    updatedAt: "2026-09-01T10:00:00Z"
  },
  {
    id: "plan-6",
    name: "Premium Analytics Suite",
    cadence: "Yearly",
    price: 990,
    prorationRule: "Daily proration",
    cancellationRule: "Partial refund for unused months",
    status: "Active",
    products: ["Premium Analytics Suite"],
    description: "Full analytics suite with custom dashboards and alerts",
    billingInterval: 1,
    billingUnit: "year",
    createdAt: "2026-09-01T10:00:00Z",
    updatedAt: "2026-09-01T10:00:00Z"
  },
  {
    id: "plan-7",
    name: "Legacy Support Plan",
    cadence: "Quarterly",
    price: 75,
    prorationRule: "No proration",
    cancellationRule: "Non-refundable",
    status: "Inactive",
    products: ["Legacy Support Plan"],
    description: "Legacy support plan for existing customers only",
    billingInterval: 3,
    billingUnit: "month",
    createdAt: "2026-08-15T10:00:00Z",
    updatedAt: "2026-08-15T10:00:00Z"
  }
];

// ==================== SUBSCRIPTION STATS ====================
export const MOCK_SUBSCRIPTION_STATS = {
  totalActivePlans: 5,
  totalInactivePlans: 2,
  totalSubscribers: 12,
  monthlyRecurringRevenue: 1980,
  annualRecurringRevenue: 23760,
  mostPopularPlan: "24/7 Premium Support",
  plansByCadence: {
    Monthly: 3,
    Quarterly: 2,
    Yearly: 2
  }
};