import React, { useEffect } from "react";
import { Route, Routes, redirect, useNavigate } from "react-router-dom";
import Main from "./Main";
import TicketReports from "./Modules/TicketReports";
import NotFound from "./NotFound";
import ProtectedRoute from "./ProtectedRoute";

function MainRoute() {
  return (
    <>
      <ProtectedRoute>
        <Routes>
          <Route path="" element={<Main />} />
          <Route path="tickets-reports" element={<TicketReports />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </ProtectedRoute>
    </>
  );
}

export default MainRoute;
