import { Controller, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import { TextField, IconButton, InputLabel, FormControl } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


const labelSx = {
  fontFamily: "IranSans",
  fontWeight: 200,
};

function InputText({
  placeholder,
  label,
  rules,
  name,
  helperText,
  variant,
  type,
  disabled,
  style,
}) {
  const {
    control,
    formState: { errors },
    getValues,
  } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  useEffect(() => {
    if (errors[name]) {
      toast.error(helperText);
    }
  }, [errors]);
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={getValues(name)}
      render={({ field }) => (
        <FormControl>
          <InputLabel shrink sx={labelSx} id="InputLabel">
            {label}
          </InputLabel>
          <TextField
            disabled={disabled}
            {...field}
            placeholder={placeholder}
            sx={style}
            error={!!errors[name]}
            variant={variant}
            type={
              type === "password" ? (showPassword ? "text" : "password") : type
            }
            InputProps={{
              endAdornment:
                type === "password" ? (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                ) : null,
              dir: "ltr",
            }}
          />
        </FormControl>
      )}
    />
  );
}

InputText.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  rules: PropTypes.object,
  helperText: PropTypes.string,
  variant: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.object,
};

InputText.defaultProps = {
  placeholder: "",
  label: "",
  rules: {},
  helperText: "",
  variant: "outlined",
  type: "text",
  disabled: false,
  style: {},
};

export { InputText };
