import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { decodeToken } from "../../utiles/DeCodeToken";
import React, { useContext, useEffect, useState } from "react";
import { TokenContext } from "../../src/App";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import PasswordModal from "../Modules/PasswordModal";
const typoStyle = { fontFamily: "IranSans", fontWeight: 600 };

const stackStyle = {
  borderBottom: "2px solid rgba(0, 0, 0, 0.1)",
  paddingBottom: "0.3rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: "3rem",
};

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { token } = useContext(TokenContext);
  const [name, setName] = useState("");
  const [showModal, setShowModal] = useState(false);
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

  const menuHandler = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
          <Tooltip title="برگشت به خانه">
            <IconButton onClick={homeHandler}>
              <OtherHousesIcon sx={{ color: "#d2bc19 " }} />
            </IconButton>
          </Tooltip>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ ...typoStyle, m: 1 }}>{name}</Typography>
          <Avatar
            src="/broken-image.jpg"
            sx={{ backgroundColor: "#B880D8", m: 1, position: "relative" }}
            onClick={menuHandler}
            id="profileButton"
          />
          <Menu
            id="profileMenu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "profileButton",
            }}
          >
            <MenuItem>
              <Box sx={{ display: "flex" }}>
                <AccountCircleIcon sx={{ color: "#B880D8" }} />
                <Typography sx={{ fontFamily: "IranSans", mr: 1 }}>
                  پروفایل
                </Typography>
              </Box>
            </MenuItem>
            <MenuItem onClick={() => setShowModal(true)}>
              <Box sx={{ display: "flex" }}>
                <LockIcon sx={{ color: "#d9a66e " }} />
                <Typography sx={{ fontFamily: "IranSans", mr: 1 }}>
                  تغییر رمز عبور
                </Typography>
              </Box>{" "}
            </MenuItem>
          </Menu>
          <Divider orientation="vertical" flexItem />

          <Tooltip title="خروج">
            <IconButton aria-label="power settings" onClick={logOutHandler}>
              <PowerSettingsNewIcon sx={{ color: "#b126b2" }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Stack>
      {showModal && (
        <PasswordModal setShowModal={setShowModal} showModal={showModal} />
      )}
    </Box>
  );
}

export default Header;
