import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { decodeToken } from "../../utiles/DeCodeToken";
import React, { useContext, useEffect, useRef, useState } from "react";
import { TokenContext } from "../../src/App";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";
const typoStyle = { fontFamily: "IranSans", fontWeight: 600 };
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useNavigate } from "react-router-dom";

const stackStyle = {
  borderBottom: "2px solid rgba(0, 0, 0, 0.1)",
  marginBottom: "1rem",
  paddingBottom: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

function Header() {
  const { token } = useContext(TokenContext);
  const [name, setName] = useState("");

  useEffect(() => {
    if (token) {
      const { userName } = decodeToken(token);
      setName(userName);
    }
  }, [token]);
  const logOutHandler = () => {
    sessionStorage.removeItem("mainToken");
    window.location.href = "/login";
  };
  const homeHandler = () => {
    window.location.href = "/main";
  };
  return (
    <Box sx={{ m: 1 }}>
      <Stack spacing={2} direction="row" alignItems="center" sx={stackStyle}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pr: 3,
          }}
        >
          <Tooltip title="LogOut">
            <IconButton aria-label="power settings" onClick={logOutHandler}>
              <PowerSettingsNewIcon />
            </IconButton>
          </Tooltip>

          <Divider orientation="vertical" flexItem />
          <Tooltip title="Home">
            <IconButton onClick={homeHandler}>
              <OtherHousesIcon />
            </IconButton>{" "}
          </Tooltip>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", pl: 3 }}>
          <Typography sx={{ ...typoStyle, m: 1 }}>{name}</Typography>
          <Avatar src="/broken-image.jpg" sx={{ backgroundColor: "#B880D8" }} />
        </Box>
      </Stack>
    </Box>
  );
}

export default Header;
