import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Modal,
  Typography,
  TextField,
  IconButton,
  Button,
  Stack,
  Divider,
  InputLabel,
  FormControl,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CloseIcon from "@mui/icons-material/Close";
import toast from "react-hot-toast";
import { decodeToken } from "../../utiles/DeCodeToken";
import { TokenContext } from "../../src/App";
import Api from "../../api/api";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../../api/fetchData";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};
function PasswordModal({ setShowModal, showModal }) {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { token } = useContext(TokenContext);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onSuccess = () => {
    toast.success("پس ورود با موفقیت تغییر یافت");
    sessionStorage.clear("mainToken");
    navigate("/login");
  };
  useEffect(() => {
    if (token) {
      const { userName } = decodeToken(token);
      setUsername(userName);
    }
  }, [token]);
  const mutation = useMutation({
    mutationFn: changePassword,
    onSuccess: onSuccess,
    onError: (error) => {
      console.error("خطا در ورود:", error.message);
      toast.error("تغییر رمز عبور با مشکل مواجه شده است");
    },
  });
  const onSubmit = (data) => {
    console.log(data);
    mutation.mutate(data);
  };
  return (
    <Modal
      open={showModal}
      onClose={() => setShowModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h6"
            sx={{ fontFamily: "IranSans", color: "#009eff" }}
          >
            تغییر رمز عبور
          </Typography>
          <IconButton onClick={() => setShowModal(false)}>
            <CloseIcon sx={{ color: "#009eff" }} />
          </IconButton>
        </Stack>
        <Divider sx={{ mb: 2 }} />

        <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="username" shrink>
              نام کاربری
            </InputLabel>
            <TextField disabled id="username" value={username} fullWidth />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="password" shrink>
              رمز عبور فعلی
            </InputLabel>
            <TextField
              {...register("password")}
              id="password"
              type={showPassword ? "text" : "password"}
              fullWidth
              autoComplete="new-password"
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
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="confirm-password" shrink>
              رمز عبور جدید
            </InputLabel>
            <TextField
              {...register("confirmPassword")}
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              fullWidth
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                ),
              }}
            />
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{
              mt: 2,
              fontFamily: "IranSans",
              height: "3rem",
              fontSize: "medium",
            }}
          >
            تغییر رمز عبور
          </Button>
        </form>
      </Box>
    </Modal>
  );
}

export default PasswordModal;
