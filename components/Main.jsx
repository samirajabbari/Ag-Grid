import React, { useContext, useEffect, useState } from "react";
import styles from "./Styles/Main.module.css";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { decodeToken } from "../utiles/DeCodeToken";
import { TokenContext, serverContext } from "../src/App";
import Api from "../api/api";
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PageviewIcon from "@mui/icons-material/Assignment";

import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import ChartPanel from "./Modules/ChartPanel";

const typoStyle = { fontFamily: "IranSans", fontWeight: 600 };
const stackStyle = {
  borderBottom: "2px solid rgba(0, 0, 0, 0.1)",
  marginBottom: "1rem",
  paddingBottom: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const iconButtonStyle = {
  alignSelf: "flex-start",
  marginLeft: "auto",
};
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
  const navigate = useNavigate();
  useEffect(() => {
    const user = decodeToken(token);
    setName(user.userName);
  }, []);

  const { server, setServer } = useContext(serverContext);

  useEffect(() => {
    const decodedToken = decodeToken(token);
    const covertToNumberArayy = decodedToken.allowedServers.map(Number);

    const fetchServers = async () => {
      try {
        const res = await Api.get("/api/v1.0-rc/servers", {
          params: {
            idArray: `[${covertToNumberArayy}]`,
          },
        });
        setServer(res.data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchServers();
  }, []);
  const logOutHandler = () => {
    sessionStorage.removeItem("mainToken");
    navigate("/login");
  };
  return (
    <div className={styles.container}>
      <div>
        <Stack spacing={2} direction="row" alignItems="center" sx={stackStyle}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar src="/broken-image.jpg" />
            <Typography sx={{ ...typoStyle, m: 1 }}>{name}</Typography>
          </Box>
          <IconButton
            aria-label="power settings"
            sx={iconButtonStyle}
            onClick={logOutHandler}
          >
            <PowerSettingsNewIcon />
          </IconButton>
        </Stack>
      </div>
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
