import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import {
  TextField,
  IconButton,
  InputLabel,
  FormControl,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

const labelSx = {
  fontFamily: "IranSans",
  fontWeight: 200,
};

function PriceInput({
  placeholder,
  label,
  rules,
  name,
  helperText,
  variant,
  type,
  disabled,
  style,
  control,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const formatPrice = (value) => {
    return value?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleChange = (event, field) => {
    const { value } = event.target;
    const formattedValue = formatPrice(value.replace(/,/g, ""));
    field.onChange(formattedValue);
  };
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <FormControl>
          <InputLabel shrink sx={labelSx} id="InputLabel">
            {label}
          </InputLabel>
          <TextField
            autoComplete="off"
            disabled={disabled}
            {...field}
            placeholder={placeholder}
            sx={style}
            variant={variant}
            value={formatPrice(field.value)}
            onChange={(event) => handleChange(event, field)}
            type={
              type === "password" ? (showPassword ? "text" : "password") : type
            }
            InputProps={{
              endAdornment:
                type !== "password" ? (
                  <InputAdornment position="end">ریال</InputAdornment>
                ) : (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                ),
              dir: "ltr",
            }}
          />
        </FormControl>
      )}
    />
  );
}

PriceInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  rules: PropTypes.object,
  helperText: PropTypes.string,
  variant: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.object,
  control: PropTypes.object.isRequired,
};

PriceInput.defaultProps = {
  placeholder: "",
  label: "",
  rules: {},
  helperText: "",
  variant: "outlined",
  type: "text",
  disabled: false,
  style: {},
};

export { PriceInput };
