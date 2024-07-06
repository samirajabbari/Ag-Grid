import React, { useContext, useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import Api from "../api/api";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../src/App";

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
      alert("ورود ناموفق. لطفا مجددا تلاش کنید.");
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
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
        <Typography
          variant="h5"
          sx={{
            marginBottom: "2rem",
            fontWeight: "700",
            textAlign: "center",
            fontFamily: "YekanBakh",
          }}
        >
          ورود به صفحه کاربری
        </Typography>
        <TextField
          placeholder="نام کاربری"
          sx={{ marginBottom: "1rem",fontFamily: "YekanBakh",fontSize:"1rem"  }}
          onChange={usernameHandler}
        />
        <TextField
          placeholder="رمز عبور"
          type="password"
          sx={{ marginBottom: "1rem",fontFamily: "YekanBakh",fontSize:"1rem" }}
          onChange={passwordHandler}
        />
        <Button variant="contained" color="primary" onClick={checkHandler}sx={{ fontFamily: "YekanBakh",fontSize:"1rem" }} >
          ورود
        </Button>
      </Box>
    </Container>
  );
}

export default LoginPage;
