import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
//---------------component / css --------------------
import LoginPage from "../components/LoginPage";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import MainRoute from "../components/MainRoute.jsx";
import { decodeToken } from "../utiles/DeCodeToken.js";
import { Toaster } from "react-hot-toast";
import "./Styles/fonts.css";
import { from } from "jalali-moment";
//---------------context --------------------

export const TokenContext = createContext();
export const serverContext = createContext();
const queryClient = new QueryClient();

//-------------------------------------------
function App() {
  const [token, setToken] = useState("");
  const [decodedToken, setDeCodeToken] = useState("");
  const [server, setServer] = useState("");

  useEffect(() => {
    const mainToken = sessionStorage.getItem("mainToken");
    const tokenDecoded = decodeToken(token);
    setDeCodeToken(tokenDecoded);
    setToken(mainToken);
  }, []);
  const theme = createTheme({
    direction: "rtl !important",
  });
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <serverContext.Provider value={{ server, setServer }}>
          <TokenContext.Provider value={{ token, setToken, decodedToken }}>
            <BrowserRouter>
              <Routes>
                <Route
                  path="/login"
                  element={!token ? <LoginPage /> : <Navigate to={"/main"} />}
                />
                <Route
                  path="/main/*"
                  element={
                    <ProtectedRoute>
                      <MainRoute />
                    </ProtectedRoute>
                  }
                />

                <Route path="/" element={<Navigate to="/main" />} />
              </Routes>
            </BrowserRouter>
            <Toaster position="top-center" reverseOrder={false} />
          </TokenContext.Provider>
        </serverContext.Provider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
