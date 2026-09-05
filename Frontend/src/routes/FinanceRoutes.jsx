import { Route, Routes } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import { ROLES } from "../utils/constants";

// Placeholder pages (will be created later)
import FinanceDashboard from "../pages/finance/FinanceDashboard";
import Approvals from "../pages/finance/Approvals";
import ApprovalDetails from "../pages/finance/ApprovalDetails";
import Fulfillment from "../pages/finance/Fulfillment";
import Inventory from "../pages/finance/Inventory";
import Billing from "../pages/finance/Billing";
import Invoices from "../pages/finance/Invoices";

export default function FinanceRoutes() {
  return (
    <DashboardLayout role={ROLES.FINANCE}>
      <Routes>
        <Route index element={<FinanceDashboard />} />
        <Route path="approvals" element={<Approvals />} />
        <Route path="approvals/:id" element={<ApprovalDetails />} />
        <Route path="fulfillment" element={<Fulfillment />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="billing" element={<Billing />} />
        <Route path="invoices" element={<Invoices />} />
      </Routes>
    </DashboardLayout>
  );
}