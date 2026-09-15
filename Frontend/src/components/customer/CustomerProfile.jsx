import { LogOut, User, Mail, Building2, Shield } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function CustomerProfile() {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div>
      <PageHeader 
        title="Profile" 
        description="Your account information" 
      />

      <div className="max-w-2xl">
        <Card>
          <div className="space-y-6">
            {/* Avatar */}
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl font-semibold text-blue-600">
                {(user?.name || "C").slice(0, 1).toUpperCase()}
              </div>
              <div>
                <p className="font-display text-xl font-semibold text-slate-800">
                  {user?.name || "Customer"}
                </p>
                <p className="text-sm text-slate-400">Customer Portal</p>
              </div>
            </div>

            <div className="border-t border-blue-100 pt-4 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <User className="h-4 w-4 text-slate-400" />
                <span className="text-slate-600">Name:</span>
                <span className="font-medium text-slate-800">{user?.name || "Not set"}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-slate-400" />
                <span className="text-slate-600">Email:</span>
                <span className="font-medium text-slate-800">{user?.email || "Not set"}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Building2 className="h-4 w-4 text-slate-400" />
                <span className="text-slate-600">Company:</span>
                <span className="font-medium text-slate-800">{user?.company || "Not set"}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="h-4 w-4 text-slate-400" />
                <span className="text-slate-600">Role:</span>
                <span className="font-medium text-slate-800 capitalize">{user?.role || "Customer"}</span>
              </div>
            </div>

            <div className="border-t border-blue-100 pt-4">
              <Button 
                variant="danger" 
                icon={LogOut} 
                className="w-full"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}