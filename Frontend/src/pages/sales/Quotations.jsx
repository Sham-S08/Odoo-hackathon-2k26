import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FilePlus2, LayoutGrid, List } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import Button from "../../components/common/Button";
import QuotationTable from "../../components/sales/QuotationTable";
import QuotationCard from "../../components/sales/QuotationCard";
import { SAMPLE_QUOTATIONS } from "../../utils/sampleData";

export default function Quotations({ pipelineView = false }) {
  const navigate = useNavigate();
  const [view, setView] = useState(pipelineView ? "grid" : "list");

  return (
    <div>
      <PageHeader
        title={pipelineView ? "Pipeline" : "Quotations"}
        description="Track every quote from draft to confirmation"
        actions={
          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-lg border border-royal-200 p-0.5">
              <button
                onClick={() => setView("list")}
                className={`rounded-md p-1.5 ${view === "list" ? "bg-royal-600 text-white" : "text-royal-400"}`}
              >
                <List className="h-4 w-4" />
              </button>
              <button
                onClick={() => setView("grid")}
                className={`rounded-md p-1.5 ${view === "grid" ? "bg-royal-600 text-white" : "text-royal-400"}`}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
            </div>
            <Button variant="gradient" icon={FilePlus2} onClick={() => navigate("/sales/quotations/new")}>
              New Quotation
            </Button>
          </div>
        }
      />

      {view === "list" ? (
        <QuotationTable
          quotations={SAMPLE_QUOTATIONS}
          onOpen={(q) => navigate(`/sales/quotations/${q.id}`)}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SAMPLE_QUOTATIONS.map((q) => (
            <QuotationCard key={q.id} quotation={q} onOpen={() => navigate(`/sales/quotations/${q.id}`)} />
          ))}
        </div>
      )}
    </div>
  );
}
