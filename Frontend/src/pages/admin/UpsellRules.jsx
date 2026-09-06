import { useState } from "react";
import { Plus, Search } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import Input from "../../components/common/Input";
import UpsellRuleTable from "../../components/admin/UpsellRuleTable";
import UpsellRuleForm from "../../components/admin/UpsellRuleForm";
import { MOCK_UPSELL_RULES } from "../../utils/adminMockData";

export default function UpsellRules() {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRules = MOCK_UPSELL_RULES.filter((rule) =>
    rule.baseProduct.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rule.suggestedProduct.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <PageHeader
        title="Upsell & Cross-Sell Rules"
        description="Configure product recommendations based on historical co-purchase data and promotions"
        actions={
          <Button variant="primary" icon={Plus} onClick={() => { setEditing(null); setOpen(true); }}>
            New Rule
          </Button>
        }
      />

      <div className="mb-4 rounded-xl border border-blue-100 bg-blue-50/40 p-3">
        <p className="text-sm text-slate-600">
          <span className="font-medium text-blue-600">Note:</span> Only suggestions satisfying the configured margin threshold
          will surface to Sales representatives during quotation building.
        </p>
      </div>

      <div className="mb-4 max-w-sm">
        <Input
          placeholder="Search by product name..."
          icon={Search}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <UpsellRuleTable 
        rules={filteredRules} 
        onEdit={(r) => { setEditing(r); setOpen(true); }} 
      />

      <Modal 
        open={open} 
        onClose={() => setOpen(false)} 
        title={editing ? "Edit Upsell Rule" : "New Upsell Rule"}
        size="lg"
      >
        <UpsellRuleForm 
          initialValue={editing} 
          onSubmit={() => setOpen(false)} 
          onCancel={() => setOpen(false)} 
        />
      </Modal>
    </div>
  );
}