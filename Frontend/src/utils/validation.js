export const isRequired = (value) => String(value ?? "").trim().length > 0;

export const isEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value ?? "").trim());

export const validatePassword = (value) => String(value ?? "").length >= 8;

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
    description: "24x7 priority support with 4-hour response time"
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
    description: "Advanced analytics and custom reporting dashboard"
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
    description: "Advanced security, compliance, and monitoring service"
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
    description: "Basic support with 24-hour response time"
  }
];