import { LogOut, User, Mail, Building2, Shield } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import { useAuthContext } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { customerApi } from "../../api/customers.api";
import { useNotification } from "../../context/NotificationContext";
import { useNavigate } from "react-router-dom";

export default function CustomerProfile() {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  const { notify } = useNotification();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    customerApi.getProfile()
      .then((response) => setProfile(response.data))
      .catch((requestError) => setError(requestError.message || "Could not load profile"))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (requestError) {
      notify(requestError.message || "Could not log out", "error");
    }
  };

  const name = profile?.user?.name || user?.name || profile?.name || "Customer";
  const email = profile?.user?.email || user?.email || profile?.email || "Not set";

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
                {name.slice(0, 1).toUpperCase()}
              </div>
              <div>
                <p className="font-display text-xl font-semibold text-slate-800">
                  {name}
                </p>
                <p className="text-sm text-slate-400">Customer Portal</p>
              </div>
            </div>

            <div className="border-t border-blue-100 pt-4 space-y-3">
              {loading && <p className="text-sm text-slate-500">Loading profile...</p>}
              {error && <p className="text-sm text-rose-600">{error}</p>}
              <div className="flex items-center gap-3 text-sm">
                <User className="h-4 w-4 text-slate-400" />
                <span className="text-slate-600">Name:</span>
                <span className="font-medium text-slate-800">{name}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-slate-400" />
                <span className="text-slate-600">Email:</span>
                <span className="font-medium text-slate-800">{email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Building2 className="h-4 w-4 text-slate-400" />
                <span className="text-slate-600">Company:</span>
                <span className="font-medium text-slate-800">{profile?.company?.name || user?.company || "Not set"}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="h-4 w-4 text-slate-400" />
                <span className="text-slate-600">Tier:</span>
                <span className="font-medium text-slate-800 capitalize">{profile?.tier || "Not set"}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="h-4 w-4 text-slate-400" />
                <span className="text-slate-600">Status:</span>
                <span className="font-medium text-slate-800 capitalize">{profile?.user?.role || user?.role || "Customer"}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="h-4 w-4 text-slate-400" />
                <span className="text-slate-600">Status:</span>
                <span className="font-medium text-slate-800 capitalize">{profile?.status || "Active"}</span>
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