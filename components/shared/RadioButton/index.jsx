import { FormControlLabel, Radio } from "@mui/material";
import { Controller } from "react-hook-form";
import React from "react";

function RedioButton({ value, label, style, name, rules,control }) {
 
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <FormControlLabel
          {...field}
          value={value}
          control={<Radio sx={style} />}
          label={label}
          sx={style}
        />
      )}
    />
  );
}

export { RedioButton };
