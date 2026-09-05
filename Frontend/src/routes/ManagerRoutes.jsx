import { Route, Routes } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import { ROLES } from "../utils/constants";

import ManagerDashboard from "../pages/manager/ManagerDashboard";
import Approvals from "../pages/manager/Approvals";
import ApprovalDetails from "../pages/manager/ApprovalDetails";
import DealHealth from "../pages/manager/DealHealth";
import StalledDeals from "../pages/manager/StalledDeals";
import DiscountAnomalies from "../pages/manager/DiscountAnomalies";
import Reports from "../pages/manager/Reports";

export default function ManagerRoutes() {
  return (
    <DashboardLayout role={ROLES.MANAGER}>
      <Routes>
        <Route index element={<ManagerDashboard />} />
        <Route path="approvals" element={<Approvals />} />
        <Route path="approvals/:id" element={<ApprovalDetails />} />
        <Route path="deal-health" element={<DealHealth />} />
        <Route path="stalled-deals" element={<StalledDeals />} />
        <Route path="discount-anomalies" element={<DiscountAnomalies />} />
        <Route path="reports" element={<Reports />} />
      </Routes>
    </DashboardLayout>
  );
}