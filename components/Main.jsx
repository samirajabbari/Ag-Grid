import React, { useContext, useEffect, useState } from "react";
import styles from "./Styles/Main.module.css";
import { Outlet, Link } from "react-router-dom";
import { decodeToken } from "../utiles/DeCodeToken";
import { TokenContext, serverContext } from "../src/App";
import Api from "../api/api";
import { Avatar, Card, CardHeader, Typography } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PageviewIcon from "@mui/icons-material/Assignment";
import ChartPanel from "./Modules/ChartPanel";
import { useQuery } from "@tanstack/react-query";
import { getServerList } from "../api/fetchData";
const typoStyle = { fontFamily: "IranSans", fontWeight: 600 };

const cardStyle = {
  maxWidth: 200,
  alignItems: "center",
  display: "flex",
  padding: "1rem",
  m: 1,
};
function Main() {
  const [name, setName] = useState();
  const { token } = useContext(TokenContext);
  useEffect(() => {
    const user = decodeToken(token);
    setName(user.userName);
  }, []);
  const { server, setServer } = useContext(serverContext);
  const decodedToken = decodeToken(token);
  const covertToNumberArayy = decodedToken.allowedServers.map(Number);
  const { data } = useQuery({
    queryKey: ["GetServerList", covertToNumberArayy],
    queryFn: getServerList,
  });
  useEffect(() => {
    if (data) {
      setServer(data);
    }
  }, [data]);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Link to={"/main/tickets-reports"}>
          <Card sx={cardStyle}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                  <AssignmentIcon />
                </Avatar>
              }
            />
            <Typography sx={typoStyle}>گزارشات بلیط ها</Typography>
          </Card>
        </Link>
        <Link to={"/main/tickets-reports"}>
          <Card sx={cardStyle}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: "pink" }} aria-label="recipe">
                  <PageviewIcon />
                </Avatar>
              }
            />
            <Typography sx={typoStyle}>گزارشات بلیط ها</Typography>
          </Card>
        </Link>
      </div>

      <div className={styles.bottom}>
        <ChartPanel />
      </div>
      <Outlet />
    </div>
  );
}

export default Main;
