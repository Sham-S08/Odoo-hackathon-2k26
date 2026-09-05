import { Navigate, Outlet, useLocation } from "react-router-dom";
import Loading from "../common/Loading";
import { useAuthContext } from "../../context/AuthContext";

export default function ProtectedRoute({ allowedRoles }) {
  const { user, loading } = useAuthContext();
  const location = useLocation();

  if (loading) return <Loading label="Checking your session" />;

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to their own dashboard
    return <Navigate to={`/${user.role}`} replace />;
  }

  return <Outlet />;
}