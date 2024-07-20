import {
  Autocomplete as MAutocomplete,
  Checkbox,
  TextField,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";

// options must be an array of code name  ==> eg  ===> [code:'1',name:'2']

const Autocomplete = ({
  label,
  name,
  control,
  options,
  getOptionLabel,
  style,
  defaultValue,
  onChange,
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel shrink sx={style}>
        {label}
      </InputLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <MAutocomplete
            disableCloseOnSelect
            {...field}
            value={options.filter((item) => field.value.includes(item?.code))}
            multiple={true}
            options={options}
            getOptionLabel={getOptionLabel}
            onChange={(event, newValue) => {
              field.onChange(newValue.map((item) => item.code));
              onChange(event, newValue);
            }}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  checked={selected}
                  color="primary"
                  onChange={() => {}}
                />
                {option.name}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                sx={style}
                placeholder={field.value?.length ? null : "همه"}
              />
            )}
          />
        )}
      />
    </FormControl>
  );
};

Autocomplete.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  defaultValue: PropTypes.any,
  options: PropTypes.array, //  options: PropTypes.arrayOf(PropTypes.object()),
  style: PropTypes.object,
  controlStyle: PropTypes.object,
  onChange: PropTypes.func,
  getOptionLabel: PropTypes.func,
};

export { Autocomplete };
