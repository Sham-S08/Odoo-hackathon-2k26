import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import SubscriptionModal from "./SubscriptionModal";
import { useNotification } from "../../context/NotificationContext";

export default function DashboardLayout({ role, children }) {
  const navigate = useNavigate();
  const { notify } = useNotification();
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  return (
    <div className="flex h-screen bg-blue-50/60">
      <Sidebar role={role} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar
          onReload={() => notify("Pricing, stock and approval data refreshed", "success")}
          onOpenSettings={() => navigate("/admin")}
          onOpenSubscriptions={() => setShowSubscriptionModal(true)}
        />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>

      {/* Subscription Plans Modal */}
      <SubscriptionModal
        open={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
        isAdmin={role === "ADMIN"}
      />
    </div>
  );
}