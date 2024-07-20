import React from "react";
import { Box, FormControl, InputLabel } from "@mui/material";
import { Controller } from "react-hook-form";
import MDatePicker from "react-multi-date-picker";
import Icon from "react-multi-date-picker/components/icon";
import MaskedInput from "react-text-mask";
import PropTypes from "prop-types";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import styles from "./style/style.module.css";
import persianDate from "persian-date";
const DatePicker = ({
  label,
  name,
  value,
  control,
  handleMaskedInputChange,
  handleStartPickerChange,
  handleTodayDate,
  maskInputStyle,
  id,
  sxStyle,
  dataPickerStyle,
  datePickerRef,
}) => {
  return (
    <FormControl>
      <Box className={styles.dataPickerDivStyles}>
        <InputLabel shrink sx={sxStyle}>
          {label}
        </InputLabel>
        <Controller
          name={name}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <>
              {/* <MaskedInput
                mask={[
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  "/",
                  /\d/,
                  /\d/,
                  "/",
                  /\d/,
                  /\d/,
                ]}
                placeholder="----/--/--"
                value={value}
                onChange={(e) => {
                  handleMaskedInputChange(e);
                  field.onChange(e.target.value);
                }}
                id={name}
                render={(ref, props) => (
                  <input
                    ref={ref}
                    {...props}
                    style={maskInputStyle}
                    autoComplete="off"
                  />
                )}
                autoComplete="off"
              /> */}
              <MaskedInput
                mask={[
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  "/",
                  /\d/,
                  /\d/,
                  "/",
                  /\d/,
                  /\d/,
                ]}
                placeholder="----/--/--"
                value={value}
                onChange={(e) => {
                  handleMaskedInputChange(e);
                  field.onChange(e.target.value);
                }}
                id={id}
                render={(ref, props) => (
                  <input
                    ref={ref}
                    {...props}
                    style={maskInputStyle}
                    autoComplete="off"
                  />
                )}
                autoComplete="off"
              />
              <MDatePicker
                ref={datePickerRef}
                value={value}
                render={<Icon />}
                onChange={(date) => {
                  handleStartPickerChange(date);
                  field.onChange(
                    `${date.year}/${date.month
                      .toString()
                      .padStart(2, "0")}/${date.day
                      .toString()
                      .padStart(2, "0")}`
                  );
                }}
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-left"
                mapDays={({ date }) => {
                  let props = {};
                  let isWeekend = date.weekDay.index === 6;

                  if (isWeekend) props.className = "highlight highlight-red";

                  return props;
                }}
              >
                <button
                  className={styles.datePickeButtom}
                  onClick={() => handleTodayDate(id, new persianDate())}
                >
                  امروز
                </button>
              </MDatePicker>
            </>
          )}
        />
      </Box>
    </FormControl>
  );
};

DatePicker.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.any,
  control: PropTypes.any,
  handleMaskedInputChange: PropTypes.func,
  handleStartPickerChange: PropTypes.func,
  handleTodayDate: PropTypes.func,
  maskInputStyle: PropTypes.object,
  sxStyle: PropTypes.object,
  dataPickerStyle: PropTypes.object,
  datePickerRef: PropTypes.any,
};

export { DatePicker };
