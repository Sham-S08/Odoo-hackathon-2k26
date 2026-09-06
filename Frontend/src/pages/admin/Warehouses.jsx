import { useState } from "react";
import { Plus, Search } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import Input from "../../components/common/Input";
import WarehouseTable from "../../components/admin/WarehouseTable";
import WarehouseForm from "../../components/admin/WarehouseForm";
import { MOCK_WAREHOUSES } from "../../utils/adminMockData";

export default function Warehouses() {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredWarehouses = MOCK_WAREHOUSES.filter((warehouse) =>
    warehouse.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    warehouse.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <PageHeader
        title="Warehouses"
        description="Manage warehouse locations, stock levels, and shipping cost weighting"
        actions={
          <Button variant="primary" icon={Plus} onClick={() => { setEditing(null); setOpen(true); }}>
            New Warehouse
          </Button>
        }
      />

      <div className="mb-4 max-w-sm">
        <Input
          placeholder="Search warehouses..."
          icon={Search}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <WarehouseTable 
        warehouses={filteredWarehouses} 
        onEdit={(w) => { setEditing(w); setOpen(true); }} 
      />

      <Modal 
        open={open} 
        onClose={() => setOpen(false)} 
        title={editing ? "Edit Warehouse" : "New Warehouse"}
        size="md"
      >
        <WarehouseForm 
          initialValue={editing} 
          onSubmit={() => setOpen(false)} 
          onCancel={() => setOpen(false)} 
        />
      </Modal>
    </div>
  );
}