import PageHeader from "../../components/layout/PageHeader";
import InventoryTable from "../../components/admin/InventoryTable";
import { SAMPLE_INVENTORY } from "../../utils/sampleData";

export default function Inventory() {
  return (
    <div>
      <PageHeader title="Inventory" description="Live stock levels by product and warehouse" />
      <InventoryTable inventory={SAMPLE_INVENTORY} />
    </div>
  );
}
