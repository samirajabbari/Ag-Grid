import React, { useContext, useEffect } from "react";
import styles from "./Styles/Main.module.css";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { TokenContext } from "../src/App";

function ProtectedRoute({ children }) {
  const { token, setToken } = useContext(TokenContext);
  const location = useLocation();
  useEffect(() => {
    const mainToken = sessionStorage.getItem("mainToken");
    if (!mainToken) {
      setToken(null);
    }
  }, [setToken]);

  return token ? children : <Navigate to="/login" state={{ from: location }} />;
}

export default ProtectedRoute;
