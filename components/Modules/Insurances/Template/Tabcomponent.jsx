import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
const sxStyle = {
  fontFamily: "IranSans",
  marginRight: "2rem",
  fontWeight: 200,
  direction: "rtl",
};
const stackStyle = {
  margin: "3rem 1rem",
  border: "1px solid rgba(0, 0, 0, 0.1)",
  display: "flex",
  alignItems: "center",
  height: "3rem",
  boxShadow:
    "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
};
const active = {
  borderBottom: "2px solid #1976d2 ",
};
const boxStyle = {
  width: "10rem",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
};
function Tabcomponent({ serverId }) {
  const [tabSelected, settabSelected] = useState("interCity");
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();
  const tabChangeHandler = (e) => {
    settabSelected(e.target.id);
  };
  return (
    <div>
      <FormControl variant="standard" sx={{ mt: 5, width: "50%" }}>
        <InputLabel id="demo-simple-select-filled-label" shrink sx={sxStyle}>
          سرور
        </InputLabel>
        <Controller
          name="serverId"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select
              labelId="demo-simple-select-filled-label"
              {...field}
              sx={sxStyle}
              value={field.value}
              onChange={(e) => {
                field.onChange(e);
                setSearchData((prev) => ({
                  ...prev,
                  componies: "",
                  serverId: e.target.value,
                }));
              }}
            >
              {serverId?.map((serverItem) => (
                <MenuItem
                  key={serverItem.id}
                  value={serverItem.id}
                  sx={sxStyle}
                >
                  {serverItem.description}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>
      <Stack
        spacing={2}
        direction="row"
        alignItems="center"
        sx={stackStyle}
        pr={5}
      >
        <Box
          sx={{ ...boxStyle, ...(tabSelected === "interCity" && active) }}
          id="interCity"
          onClick={tabChangeHandler}
        >
          بین شهری
        </Box>
        <Box
          sx={{ ...boxStyle, ...(tabSelected === "charter" && active) }}
          id="charter"
          onClick={tabChangeHandler}
        >
          دربستی
        </Box>
        <Box
          sx={{ ...boxStyle, ...(tabSelected === "abroad" && active) }}
          id="abroad"
          onClick={tabChangeHandler}
        >
          خارجی
        </Box>
      </Stack>
    </div>
  );
}

export default Tabcomponent;
