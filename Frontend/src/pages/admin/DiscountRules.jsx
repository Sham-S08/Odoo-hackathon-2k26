import { useState } from "react";
import { Plus, Search } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import Input from "../../components/common/Input";
import DiscountRuleTable from "../../components/admin/DiscountRuleTable";
import DiscountRuleForm from "../../components/admin/DiscountRuleForm";

const SAMPLE_RULES = [
  { id: 1, tier: "Bronze", category: "Hardware", ceiling: 5, approvalChain: "Sales Manager" },
  { id: 2, tier: "Silver", category: "Hardware", ceiling: 10, approvalChain: "Sales Manager" },
  { id: 3, tier: "Gold", category: "Hardware", ceiling: 15, approvalChain: "Sales Manager" },
  { id: 4, tier: "Gold", category: "Services", ceiling: 10, approvalChain: "Finance" },
  { id: 5, tier: "Silver", category: "Services", ceiling: 8, approvalChain: "Sales Manager" },
  { id: 6, tier: "Bronze", category: "Services", ceiling: 5, approvalChain: "Sales Manager" },
];

export default function DiscountRules() {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRules = SAMPLE_RULES.filter((rule) =>
    rule.tier.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rule.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <PageHeader
        title="Discount Tiers & Approval Chains"
        description="Define discount ceilings per customer tier and product category. Configure approval workflow."
        actions={
          <Button variant="primary" icon={Plus} onClick={() => { setEditing(null); setOpen(true); }}>
            New Rule
          </Button>
        }
      />

      {/* Search Bar */}
      <div className="mb-4 max-w-sm">
        <Input
          placeholder="Search by tier or category..."
          icon={Search}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Visual Matrix Preview */}
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