import { Route, Routes } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import { ROLES } from "../utils/constants";
import { QuotationProvider } from "../context/QuotationContext";

import SalesDashboard from "../pages/sales/SalesDashboard";
import Quotations from "../pages/sales/Quotations";
import NewQuotation from "../pages/sales/NewQuotation";
import QuotationDetails from "../pages/sales/QuotationDetails";

export default function SalesRoutes() {
  return (
    <DashboardLayout role={ROLES.SALES}>
      <QuotationProvider>
        <Routes>
          <Route index element={<SalesDashboard />} />
          <Route path="pipeline" element={<Quotations pipelineView />} />
          <Route path="quotations" element={<Quotations />} />
          <Route path="quotations/new" element={<NewQuotation />} />
          <Route path="quotations/:id" element={<QuotationDetails />} />
        </Routes>
      </QuotationProvider>
    </DashboardLayout>
  );
}
