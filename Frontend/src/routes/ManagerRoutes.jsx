import { Route, Routes } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import { ROLES } from "../utils/constants";

import ManagerDashboard from "../pages/manager/ManagerDashboard";
import Approvals from "../pages/manager/Approvals";
import ApprovalDetails from "../pages/manager/ApprovalDetails";

export default function ManagerRoutes() {
  return (
    <DashboardLayout role={ROLES.MANAGER}>
      <Routes>
        <Route index element={<ManagerDashboard />} />
        <Route path="approvals" element={<Approvals />} />
        <Route path="approvals/:id" element={<ApprovalDetails />} />
      </Routes>
    </DashboardLayout>
  );
}
