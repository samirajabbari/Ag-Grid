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

function PasswordModal({ setShowModal, showModal }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async () => {
    try {
      const res = await Api.post(
        "http://192.168.1.20:8081/api/v1.0-rc/users/changePassword",

        {
          currentPassword: password,
          newPassword: confirmPassword,
        }
      );
      toast.success("پس ورود با موفقیت تغییر یافت");
      sessionStorage.clear("mainToken");
      navigate("/login");
    } catch (error) {
      toast.error("مشکلی پیش اماده و رمز عبور تغییر نیافت");
      console.log(error);
    }
  };

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
  const { token } = useContext(TokenContext);

  useEffect(() => {
    if (token) {
      const { userName } = decodeToken(token);
      setUsername(userName);
    }
  }, [token]);

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
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
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
            تایید رمز عبور
          </InputLabel>
          <TextField
            id="confirm-password"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
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
          onClick={handleSubmit}
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
      </Box>
    </Modal>
  );
}

export default PasswordModal;
