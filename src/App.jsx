import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import "./Styles/fonts.css";
//---------------component / css --------------------
import LoginPage from "../components/LoginPage";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import MainRoute from "../components/MainRoute.jsx";
import { decodeToken } from "../utiles/DeCodeToken.js";
//---------------context --------------------

export const TokenContext = createContext();
export const serverContext = createContext();
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
    direction: "rtl",
  });
  return (
    // <ThemeProvider theme={theme}>
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
        </TokenContext.Provider>
      </serverContext.Provider>
    // </ThemeProvider>
  );
}

export default App;
