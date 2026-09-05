import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useNotification } from "../../context/NotificationContext";

export default function DashboardLayout({ role, children }) {
  const navigate = useNavigate();
  const { notify } = useNotification();

  return (
    <div className="flex h-screen bg-blue-50/60">
      <Sidebar role={role} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar
          onReload={() => notify("Pricing, stock and approval data refreshed", "success")}
          onOpenSettings={() => navigate("/admin")}
        />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}