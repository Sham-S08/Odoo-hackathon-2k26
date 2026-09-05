import WarehouseAllocation from "./WarehouseAllocation";
import BackorderAlert from "./BackorderAlert";
import Button from "../common/Button";
import { CheckCircle2, SlidersHorizontal } from "lucide-react";

export default function WarehouseSplit({ allocations = [], backorder, onAccept, onOverride }) {
  return (
    <div className="space-y-4">
      {allocations.map((a) => (
        <WarehouseAllocation key={a.warehouseId} allocation={a} />
      ))}
      {backorder && <BackorderAlert backorder={backorder} />}
      <div className="flex gap-2">
        <Button variant="primary" icon={CheckCircle2} onClick={onAccept}>
          Accept Suggested Split
        </Button>
        <Button variant="secondary" icon={SlidersHorizontal} onClick={onOverride}>
          Manual Override
        </Button>
      </div>
    </div>
  );
}
