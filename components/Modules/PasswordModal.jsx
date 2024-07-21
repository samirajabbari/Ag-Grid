import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Stack,
  Divider,
  FormControl,
  Tooltip,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import toast from "react-hot-toast";
import { decodeToken } from "../../utiles/DeCodeToken";
import { TokenContext } from "../../src/App";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../../api/fetchData";
import { Modals, InputText, Button } from "../shared";
const inputStyle = {
  fontFamily: "IranSans",
  fontSize: "1rem",
};
function PasswordModal({ setShowModal }) {
  const methods = useForm();

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const { token } = useContext(TokenContext);

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
    <Modals>
      <Modals.Header>
        <Box>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            pb={1}
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
              <CloseIcon sx={{ color: "#9b2334" }} />
            </IconButton>
          </Stack>
          <Divider sx={{ mb: 2, backgroundColor: "#1976d2" }} />
        </Box>
      </Modals.Header>
      <FormProvider {...methods}>
        <form fullWidth onSubmit={methods.handleSubmit(onSubmit)}>
          <FormControl fullWidth margin="normal">
            <InputText
              disabled={true}
              name="username"
              placeholder={username}
              label="نام کاربری"
              rules={{}}
              helperText=""
              type={"text"}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputText
              disabled={false}
              name="password"
              placeholder=""
              label="رمز عبور فعلی"
              rules={{ required: "این فیلد الزامی است" }}
              helperText="رمز عبور فعلی را وارد کنید"
              style={inputStyle}
              type={"password"}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputText
              disabled={false}
              name="confirmPassword"
              placeholder=""
              label="رمز عبور جدید"
              rules={{ required: "این فیلد الزامی است" }}
              helperText="رمز عبور جدید را  وارد کنید"
              type={"password"}
              style={inputStyle}
            />
          </FormControl>
          <Button
            style={{
              width: "100%",
              mt: 2,
              fontFamily: "IranSans",
              height: "3rem",
              fontSize: "medium",
            }}
            variant="contained"
            color="primary"
            onClick={() => onSubmit}
            type="submit"
            title="تغییر رمز عبور"
          />
        </form>
      </FormProvider>
    </Modals>
  );
}

export default PasswordModal;
