import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import { ROLES } from "../utils/constants";

import Landing from "../pages/Landing";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";

import AdminRoutes from "./AdminRoutes";
import SalesRoutes from "./SalesRoutes";
import ManagerRoutes from "./ManagerRoutes";
import FinanceRoutes from "./FinanceRoutes";
import CustomerRoutes from "./CustomerRoutes";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected routes by role */}
      <Route element={<ProtectedRoute allowedRoles={[ROLES.ADMIN]} />}>
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={[ROLES.SALES]} />}>
        <Route path="/sales/*" element={<SalesRoutes />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={[ROLES.MANAGER]} />}>
        <Route path="/manager/*" element={<ManagerRoutes />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={[ROLES.FINANCE]} />}>
        <Route path="/finance/*" element={<FinanceRoutes />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={[ROLES.CUSTOMER]} />}>
        <Route path="/portal/*" element={<CustomerRoutes />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}