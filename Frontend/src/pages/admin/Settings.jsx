import { useState } from "react";
import { Save } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import Select from "../../components/common/Select";
import Button from "../../components/common/Button";
import { useNotification } from "../../context/NotificationContext";

const CURRENCY_OPTIONS = [
  { value: "USD", label: "USD - US Dollar" },
  { value: "EUR", label: "EUR - Euro" },
  { value: "GBP", label: "GBP - British Pound" },
  { value: "INR", label: "INR - Indian Rupee" },
];

export default function Settings() {
  const { notify } = useNotification();
  const [saving, setSaving] = useState(false);

  const [settings, setSettings] = useState({
    companyName: "DealFlow360 Inc.",
    defaultCurrency: "USD",
    taxConfig: 10,
    stalledDealThreshold: 5,
    approvalDefaults: "Manager",
    notifications: true,
  });

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      notify("Settings saved successfully", "success");
    }, 800);
  };

  return (
    <div>
      <PageHeader
        title="Settings"
        description="Company configuration, default values, and system preferences"
        actions={
          <Button variant="primary" icon={Save} loading={saving} onClick={handleSave}>
            Save Settings
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card title="Company Information">
          <div className="space-y-4">
            <Input
              label="Company Name"
              value={settings.companyName}
              onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
            />
            <Select
              label="Default Currency"
              options={CURRENCY_OPTIONS}
              value={settings.defaultCurrency}
              onChange={(e) => setSettings({ ...settings, defaultCurrency: e.target.value })}
            />
            <Input
              label="Tax Configuration %"
              type="number"
              value={settings.taxConfig}
              onChange={(e) => setSettings({ ...settings, taxConfig: Number(e.target.value) })}
            />
          </div>
        </Card>

        <Card title="Approval & Deal Health">
          <div className="space-y-4">
            <Input
              label="Stalled Deal Threshold (days)"
              type="number"
              value={settings.stalledDealThreshold}
              onChange={(e) => setSettings({ ...settings, stalledDealThreshold: Number(e.target.value) })}
            />
            <Select
              label="Default Approval Level"
              options={[
                { value: "Manager", label: "Sales Manager" },
                { value: "Finance", label: "Sales Manager + Finance" },
                { value: "None", label: "No Approval Required" },
              ]}
              value={settings.approvalDefaults}
              onChange={(e) => setSettings({ ...settings, approvalDefaults: e.target.value })}
            />
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="notifications"
                checked={settings.notifications}
                onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })}
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-400"
              />
              <label htmlFor="notifications" className="text-sm text-slate-700">
                Enable Notification Preferences
              </label>
            </div>
          </div>
        </Card>
      </div>

      <Card title="System Preferences" className="mt-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-slate-700">DealFlow360 Version</p>
            <p className="text-sm text-slate-400">v1.0.0</p>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-700">Environment</p>
            <p className="text-sm text-slate-400">Development</p>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-700">API Status</p>
            <p className="text-sm text-emerald-600">● Connected</p>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-700">AI Service</p>
            <p className="text-sm text-emerald-600">● Available</p>
          </div>
        </div>
      </Card>
    </div>
  );
}