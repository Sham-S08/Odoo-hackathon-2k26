import { Route, Routes } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import { ROLES } from "../utils/constants";

import FinanceDashboard from "../pages/finance/FinanceDashboard";
import FinanceApprovals from "../pages/finance/Approvals";
import Fulfillment from "../pages/finance/Fulfillment";
import FinanceInventory from "../pages/finance/Inventory";
import Billing from "../pages/finance/Billing";
import Invoices from "../pages/finance/Invoices";

export default function FinanceRoutes() {
  return (
    <DashboardLayout role={ROLES.FINANCE}>
      <Routes>
        <Route index element={<FinanceDashboard />} />
        <Route path="approvals" element={<FinanceApprovals />} />
        <Route path="fulfillment" element={<Fulfillment />} />
        <Route path="inventory" element={<FinanceInventory />} />
        <Route path="billing" element={<Billing />} />
        <Route path="invoices" element={<Invoices />} />
      </Routes>
    </DashboardLayout>
  );
}