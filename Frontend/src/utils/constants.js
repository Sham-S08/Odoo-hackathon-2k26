export const ROLES = {
  ADMIN: "admin",
  SALES: "sales",
  MANAGER: "manager",
  FINANCE: "finance",
  CUSTOMER: "customer",
};

export const QUOTATION_STAGES = {
  DRAFT: "Draft",
  PENDING_APPROVAL: "Pending Approval",
  UNDER_NEGOTIATION: "Under Negotiation",
  APPROVED: "Approved",
  REJECTED: "Rejected",
  CONFIRMED: "Confirmed",
  FULFILLED: "Fulfilled",
};

export const CUSTOMER_TIERS = {
  BRONZE: { label: "Bronze", ceiling: 5, color: "amber" },
  SILVER: { label: "Silver", ceiling: 10, color: "slate" },
  GOLD: { label: "Gold", ceiling: 15, color: "blue" },
};

export const APPROVAL_LEVELS = {
  NONE: "None",
  MANAGER: "Sales Manager",
  FINANCE: "Sales Manager + Finance",
};

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api/v1";