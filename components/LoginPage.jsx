import React, { useContext, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Api from "../api/api";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../src/App";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import toast from "react-hot-toast";

const inputStyle = {
  marginBottom: "1rem",
  fontFamily: "IranSans",
  fontSize: "1rem",
};
const typoStyle = {
  margin: "2rem 0px",
  fontWeight: "700",
  textAlign: "center",
  fontFamily: "IranSans",
};

const boxStyle = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  maxWidth: "400px",
  alignItems: "center",
};

function LoginPage() {
  const navigate = useNavigate();
  const { token, setToken } = useContext(TokenContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const checkHandler = async () => {
    try {
      if (!username || !password) {
        alert("لطفا فیلدهای نام کاربری و رمز عبور را پر کنید.");
        return;
      }

      const response = await Api.post("/Token", {
        UserName: username,
        Password: password,
      });

      const mainToken = response.data.token;
      sessionStorage.setItem("mainToken", mainToken);
      setToken(mainToken);
      navigate("/main");
    } catch (error) {
      console.error("خطا در ورود:", error.message);
      toast.error("ورود ناموفق. لطفا مجددا تلاش کنید.");
    }
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        padding: 0,
      }}
    >
      <Grid container sx={{ height: "100%" }}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f8f8ff",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              maxWidth: "400px",
            }}
          >
            <Box sx={boxStyle}>
              <Avatar sx={{ bgcolor: "#9c27b0" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography variant="h5" sx={typoStyle}>
                ورود به صفحه کاربری
              </Typography>
            </Box>
            <TextField
              placeholder="نام کاربری"
              sx={inputStyle}
              onChange={usernameHandler}
            />
            <TextField
              placeholder="رمز عبور"
              type="password"
              sx={inputStyle}
              onChange={passwordHandler}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={checkHandler}
              sx={inputStyle}
            >
              ورود به پنل کاربری
            </Button>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            backgroundImage: 'url("src/assets/sign-in-side-bg.png")',
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "left",
          }}
        ></Grid>
      </Grid>
    </Container>
  );
}

export default LoginPage;
