import React, { createContext, useContext, useEffect, useState } from "react";
import styles from "./Styles/Main.module.css";
import { Outlet, Link } from "react-router-dom";
import { decodeToken } from "../utiles/DeCodeToken";
import { TokenContext, serverContext } from "../src/App";
import Api from "../api/api";

function Main() {
  const { token } = useContext(TokenContext);
  const { server, setServer } = useContext(serverContext);
  useEffect(() => {
    const decodedToken = decodeToken(token);
    const covertToNumberArayy = decodedToken.allowedServers.map(Number);
    const fetchServers = async () => {
      try {
        const res = await Api.get("/api/v1.0-rc/servers", {
          params: {
            idArray: `[${covertToNumberArayy}]`, //'[1094, 1099]'
          },
        });
        setServer(res.data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchServers();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.menu}>
          <Link to={"/main/tickets-reports"}>
            <p>گزارشات بلیط ها</p>
          </Link>
        </div>
      </div>
      <div className={styles.buttom}>panel </div>
      <Outlet />
    </div>
  );
}

export default Main;
