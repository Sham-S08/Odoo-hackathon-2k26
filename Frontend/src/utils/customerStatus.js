const STATUS_LABELS = {
  DRAFT: "Draft",
  PENDING_APPROVAL: "Under Review",
  APPROVED: "Awaiting Confirmation",
  REJECTED: "Rejected",
  CUSTOMER_REVIEW: "Customer Review",
  NEGOTIATION: "Under Negotiation",
  CUSTOMER_ACCEPTED: "Confirmed",
  CONVERTED: "Converted",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export function displayStatus(status) {
  return STATUS_LABELS[status] || status?.replaceAll("_", " ") || "Quotation";
}
