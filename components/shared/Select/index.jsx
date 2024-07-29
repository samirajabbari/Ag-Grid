import { FormControl, InputLabel, Select as MSelect } from "@mui/material";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";

const Select = ({
  label,
  controlStyle,
  style,
  name,
  control,
  defaultValue,
  onChange,
  children,
  variant
}) => {
  return (
    <FormControl fullWidth sx={controlStyle} variant={variant}>
      <InputLabel shrink sx={style}>
        {label}
      </InputLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <MSelect
            {...field}
            sx={style}
            onChange={(e) => {
              field.onChange(e);
              onChange(e);
            }}
          >
            {children}
          </MSelect>
        )}
      />
    </FormControl>
  );
};

Select.propTypes = {
  label: PropTypes.string,
  controlStyle: PropTypes.object,
  style: PropTypes.object,
  name: PropTypes.string,

  control: PropTypes.any,
  defaultValue: PropTypes.any,
  onChange: PropTypes.func,
  children: PropTypes.any,
  variant:PropTypes.oneOf["standard","filled"]
};

Select.defaultProps = {
  type: "auto-complete",
  variant:""
};

export { Select };
