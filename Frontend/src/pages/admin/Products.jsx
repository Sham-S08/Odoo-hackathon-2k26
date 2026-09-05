import { useState } from "react";
import { Plus } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import ProductTable from "../../components/admin/ProductTable";
import ProductForm from "../../components/admin/ProductForm";
import { SAMPLE_PRODUCTS } from "../../utils/sampleData";

export default function Products() {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  return (
    <div>
      <PageHeader
        title="Products"
        description="Manage general info, variants, and price list rules"
        actions={
          <Button variant="gradient" icon={Plus} onClick={() => { setEditing(null); setOpen(true); }}>
            New Product
          </Button>
        }
      />
      <ProductTable products={SAMPLE_PRODUCTS} onEdit={(p) => { setEditing(p); setOpen(true); }} />

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? "Edit product" : "New product"}>
        <ProductForm initialValue={editing} onSubmit={() => setOpen(false)} onCancel={() => setOpen(false)} />
      </Modal>
    </div>
  );
}
