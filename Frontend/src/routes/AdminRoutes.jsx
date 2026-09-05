import { Route, Routes } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import { ROLES } from "../utils/constants";

import AdminDashboard from "../pages/admin/AdminDashboard";
import Users from "../pages/admin/Users";
import Products from "../pages/admin/Products";
import Customers from "../pages/admin/Customers";
import DiscountRules from "../pages/admin/DiscountRules";
import Warehouses from "../pages/admin/Warehouses";
import Inventory from "../pages/admin/Inventory";
import SubscriptionPlans from "../pages/admin/SubscriptionPlans";

export default function AdminRoutes() {
  return (
    <DashboardLayout role={ROLES.ADMIN}>
      <Routes>
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="products" element={<Products />} />
        <Route path="customers" element={<Customers />} />
        <Route path="discount-rules" element={<DiscountRules />} />
        <Route path="warehouses" element={<Warehouses />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="subscription-plans" element={<SubscriptionPlans />} />
      </Routes>
    </DashboardLayout>
  );
}
