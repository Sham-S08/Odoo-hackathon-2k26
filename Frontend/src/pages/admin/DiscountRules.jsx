import { useState } from "react";
import { Plus } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import DiscountRuleTable from "../../components/admin/DiscountRuleTable";
import DiscountRuleForm from "../../components/admin/DiscountRuleForm";

const SAMPLE_RULES = [
  { tier: "Bronze", category: "Hardware", ceiling: 5, approvalChain: "Sales Manager" },
  { tier: "Silver", category: "Hardware", ceiling: 10, approvalChain: "Sales Manager" },
  { tier: "Gold", category: "Hardware", ceiling: 15, approvalChain: "Sales Manager" },
  { tier: "Gold", category: "Services", ceiling: 10, approvalChain: "Finance" },
];

export default function DiscountRules() {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  return (
    <div>
      <PageHeader
        title="Discount tiers & approval chains"
        description="Define discount ceilings per tier and category, and who reviews overages"
        actions={
          <Button variant="gradient" icon={Plus} onClick={() => { setEditing(null); setOpen(true); }}>
            New Rule
          </Button>
        }
      />
      <DiscountRuleTable rules={SAMPLE_RULES} onEdit={(r) => { setEditing(r); setOpen(true); }} />

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? "Edit rule" : "New discount rule"}>
        <DiscountRuleForm initialValue={editing} onSubmit={() => setOpen(false)} onCancel={() => setOpen(false)} />
      </Modal>
    </div>
  );
}
