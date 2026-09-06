import { Route, Routes } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import { ROLES } from "../utils/constants";

import CustomerDashboard from "../pages/customer/CustomerDashboard";
import CustomerQuotations from "../pages/customer/CustomerQuotations";
import CustomerQuotationDetails from "../pages/customer/CustomerQuotationDetails";
import CustomerProfile from "../pages/customer/CustomerProfile";

export default function CustomerRoutes() {
  return (
    <DashboardLayout role={ROLES.CUSTOMER}>
      <Routes>
        <Route index element={<CustomerDashboard />} />
        <Route path="quotations" element={<CustomerQuotations />} />
        <Route path="quotations/:id" element={<CustomerQuotationDetails />} />
        <Route path="profile" element={<CustomerProfile />} />
      </Routes>
    </DashboardLayout>
  );
}
