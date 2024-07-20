import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./Main";
import TicketReports from "./Modules/TicketReports";
import NotFound from "./NotFound";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "./Layout/Layout";
import InsurancesReport from "./Modules/Insurances/InsurancesReport";
function MainRoute() {
  return (
    <>
      <Layout>
        <ProtectedRoute>
          <Routes>
            <Route path="" element={<Main />} />

            <Route path="tickets-reports" element={<TicketReports />} />
            <Route path="insurances" element={<InsurancesReport />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ProtectedRoute>
      </Layout>
    </>
  );
}

export default MainRoute;
