import React, { useContext, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../src/App";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import toast from "react-hot-toast";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useMutation } from "@tanstack/react-query";
import { fetchToken } from "../api/fetchData";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { setToken } = useContext(TokenContext);
  const [showPassword, setShowPassword] = useState(false);

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

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

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
          <form
            style={{
              width: "100%",
              maxWidth: "400px",
            }}
            onSubmit={handleSubmit(onSubmit)}
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
                {...register("username", { required: true })}
                error={!!errors.username}
                helperText={errors.username ? "این فیلد الزامی است" : ""}
              />
              <TextField
                placeholder="رمز عبور"
                type={showPassword ? "text" : "password"}
                sx={inputStyle}
                {...register("password", { required: true })}
                error={!!errors.password}
                helperText={errors.password ? "این فیلد الزامی است" : ""}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  ),
                }}
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
