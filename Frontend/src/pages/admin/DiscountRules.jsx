import { useState } from "react";
import { Plus, Search } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import Input from "../../components/common/Input";
import DiscountRuleTable from "../../components/admin/DiscountRuleTable";
import DiscountRuleForm from "../../components/admin/DiscountRuleForm";
import { MOCK_DISCOUNT_RULES } from "../../utils/adminMockData";

export default function DiscountRules() {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRules = MOCK_DISCOUNT_RULES.filter((rule) =>
    rule.tier.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rule.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <PageHeader
        title="Discount Tiers & Approval Chains"
        description="Define discount ceilings per customer tier and product category."
        actions={
          <Button variant="primary" icon={Plus} onClick={() => { setEditing(null); setOpen(true); }}>
            New Rule
          </Button>
        }
      />

      <div className="mb-4 max-w-sm">
        <Input
          placeholder="Search by tier or category..."
          icon={Search}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="mb-4 rounded-xl border border-blue-100 bg-blue-50/40 p-4">
        <p className="text-sm font-medium text-slate-700">Discount Matrix Preview</p>
        <div className="mt-2 grid grid-cols-4 gap-2 text-xs">
          <div className="font-medium text-slate-500">Tier ↓ / Category →</div>
          <div className="font-medium text-slate-500">Hardware</div>
          <div className="font-medium text-slate-500">Services</div>
          <div className="font-medium text-slate-500">Subscriptions</div>
          <div className="font-medium text-slate-600">Bronze</div>
          <div className="text-slate-600">5%</div>
          <div className="text-slate-600">5%</div>
          <div className="text-slate-600">5%</div>
          <div className="font-medium text-slate-600">Silver</div>
          <div className="text-slate-600">10%</div>
          <div className="text-slate-600">8%</div>
          <div className="text-slate-600">10%</div>
          <div className="font-medium text-slate-600">Gold</div>
          <div className="text-slate-600">15%</div>
          <div className="text-amber-600 font-medium">10%</div>
          <div className="text-slate-600">12%</div>
        </div>
        <p className="mt-2 text-xs text-slate-400">
          <span className="font-medium">Note:</span> The stricter applicable limit is used when tier and category differ.
          <span className="block text-amber-600">Gold + Services = 10% (category limit overrides tier limit)</span>
        </p>
      </div>

      <DiscountRuleTable 
        rules={filteredRules} 
        onEdit={(r) => { setEditing(r); setOpen(true); }} 
      />

      <Modal 
        open={open} 
        onClose={() => setOpen(false)} 
        title={editing ? "Edit Discount Rule" : "New Discount Rule"}
        size="md"
      >
        <DiscountRuleForm 
          initialValue={editing} 
          onSubmit={() => setOpen(false)} 
          onCancel={() => setOpen(false)} 
        />
      </Modal>
    </div>
  );
}