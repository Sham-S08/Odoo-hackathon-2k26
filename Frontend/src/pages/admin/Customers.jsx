import { useState } from "react";
import { Plus, Search } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import Input from "../../components/common/Input";
import CustomerTable from "../../components/admin/CustomerTable";
import CustomerForm from "../../components/admin/CustomerForm";
import { MOCK_CUSTOMERS } from "../../utils/adminMockData";

export default function Customers() {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCustomers = MOCK_CUSTOMERS.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.contactEmail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <PageHeader
        title="Customers"
        description="Manage customer accounts, pricing tiers, and contacts"
        actions={
          <Button variant="primary" icon={Plus} onClick={() => { setEditing(null); setOpen(true); }}>
            New Customer
          </Button>
        }
      />

      <div className="mb-4 max-w-sm">
        <Input
          placeholder="Search customers..."
          icon={Search}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <CustomerTable 
        customers={filteredCustomers} 
        onEdit={(c) => { setEditing(c); setOpen(true); }} 
      />

      <Modal 
        open={open} 
        onClose={() => setOpen(false)} 
        title={editing ? "Edit Customer" : "New Customer"}
        size="lg"
      >
        <CustomerForm 
          initialValue={editing} 
          onSubmit={() => setOpen(false)} 
          onCancel={() => setOpen(false)} 
        />
      </Modal>
    </div>
  );
}