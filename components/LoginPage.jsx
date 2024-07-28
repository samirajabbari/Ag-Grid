import React, { useContext, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../src/App";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { fetchToken } from "../api/fetchData";
import { InputText } from "./shared";

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
  const methods = useForm();
  const navigate = useNavigate();

  const { setToken } = useContext(TokenContext);

  const mutation = useMutation({
    mutationFn: fetchToken,
    onSuccess: (mainToken) => {
      sessionStorage.setItem("mainToken", mainToken);
      setToken(mainToken);
      navigate("/main");
    },
    onError: (error) => {
      console.error("خطا در ورود:", error.message);
      toast.error("ورود ناموفق. لطفا مجددا تلاش کنید.");
    },
  });

  const onSubmit = (data) => {
    if (!data.username || !data.password) {
      toast.error("لطفا فیلدهای نام کاربری و رمز عبور را پر کنید.");
      return;
    }
    mutation.mutate(data);
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
          <FormProvider {...methods}>
            <form
              style={{
                width: "100%",
                maxWidth: "400px",
              }}
              onSubmit={methods.handleSubmit(onSubmit)}
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
                <InputText
                  disabled={false}
                  name="username"
                  placeholder="نام کاربری"
                  label=""
                  rules={{ required: "این فیلد الزامی است" }}
                  helperText="نام کاربری را وارد نمایید"
                  style={inputStyle}
                />
                <InputText
                  disabled={false}
                  name="password"
                  placeholder="رمز عبور"
                  label=""
                  rules={{ required: "این فیلد الزامی است" }}
                  helperText="رمز عبور را وارد نمایید"
                  type="password"
                  style={inputStyle}
                />
                <Button
                  variant="contained"
                  color="primary"
                  sx={inputStyle}
                  type="submit"
                >
                  ورود به پنل کاربری
                </Button>
              </Box>
            </form>
          </FormProvider>
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
