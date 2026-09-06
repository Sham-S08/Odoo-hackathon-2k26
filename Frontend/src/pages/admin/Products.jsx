import { useState } from "react";
import { Plus, Search } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import Input from "../../components/common/Input";
import ProductTable from "../../components/admin/ProductTable";
import ProductForm from "../../components/admin/ProductForm";
import { MOCK_PRODUCTS } from "../../utils/adminMockData";

export default function Products() {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = MOCK_PRODUCTS.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <PageHeader
        title="Products"
        description="Manage product catalog, pricing, and variants"
        actions={
          <Button variant="primary" icon={Plus} onClick={() => { setEditing(null); setOpen(true); }}>
            New Product
          </Button>
        }
      />

      <div className="mb-4 max-w-sm">
        <Input
          placeholder="Search products..."
          icon={Search}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <ProductTable 
        products={filteredProducts} 
        onEdit={(p) => { setEditing(p); setOpen(true); }} 
      />

      <Modal 
        open={open} 
        onClose={() => setOpen(false)} 
        title={editing ? "Edit Product" : "New Product"}
        size="lg"
      >
        <ProductForm 
          initialValue={editing} 
          onSubmit={() => setOpen(false)} 
          onCancel={() => setOpen(false)} 
        />
      </Modal>
    </div>
  );
}