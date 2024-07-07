import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";
import Icon from "react-multi-date-picker/components/icon";
import MaskedInput from "react-text-mask";

import "./Styles/search.css";
const dataPickerDivStyles = {
  display: "flex",
  height: "3.3rem",
  alignItems: "center",
  border: "1px solid #cdccca",
  borderRadius: "4px",
  marginTop: "1rem",
};
const sxStyle = { marginTop: "1rem", fontFamily: "IranSans", fontWeight: 200 };
const maskInputStyle = {
  border: "none",
  textAlign: "left",
  direction: "ltr",
  outline: "none",
  width: "100%",
  height: "90%",
  fontSize: "1rem",
  marginLeft: "0.5rem",
};
const dataPickerStyle = { marginLeft: "1rem" };

function TicketReportSarchTem({
  selectedServer,
  serverHandler,
  selectedCompany,
  copmanyHandler,
  setEndDate,
  setStartDate,
  searchHandler,
  server,
  componies,
  startDate,
  endDate,
  error,
}) {
  const handleMaskedInputChange = (e) => {
    if (e.target.id === "STARTDATE") {
      setStartDate(e.target.value);
    } else {
      setEndDate(e.target.value);
    }
  };
  const handleStartPickerChange = (date) => {
    const formattedDate = `${date.year}-${date.month
      .toString()
      .padStart(2, "0")}-${date.day.toString().padStart(2, "0")}`;
    setStartDate(formattedDate);
  };
  const handleENdPickerChange = (date) => {
    const formattedDate = `${date.year}-${date.month
      .toString()
      .padStart(2, "0")}-${date.day.toString().padStart(2, "0")}`;
    setEndDate(formattedDate);
  };
  return (
    <FormControl
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Typography sx={sxStyle}>لیست سرورها</Typography>
        <Select sx={sxStyle} value={selectedServer} onChange={serverHandler}>
          {server.map((serverItem) => (
            <MenuItem key={serverItem.id} value={serverItem.id} sx={sxStyle}>
              {serverItem.description}
            </MenuItem>
          ))}
        </Select>

        <Typography sx={sxStyle}>لیست شرکت ها</Typography>
        <Autocomplete
          multiple
          options={componies}
          getOptionLabel={(option) => option.name}
          value={componies.filter((item) =>
            selectedCompany.includes(item.code)
          )}
          onChange={(event, newValue) => {
            copmanyHandler({
              target: { value: newValue.map((item) => item.code) },
            });
          }}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                // sx={{ marginRight: "0.5rem" }}
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
              sx={sxStyle}
              placeholder={selectedCompany.length ? null : "همه"}
            />
          )}
        />

        <Typography sx={sxStyle}>انتخاب تاریخ از:</Typography>
        <div style={dataPickerDivStyles}>
          <MaskedInput
            mask={[/\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/]}
            placeholder="----/--/--"
            value={startDate}
            onChange={handleMaskedInputChange}
            id="STARTDATE"
            render={(ref, props) => (
              <input ref={ref} {...props} style={maskInputStyle} />
            )}
          />
          <DatePicker
            value={startDate}
            render={<Icon />}
            onChange={handleStartPickerChange}
            calendar={persian}
            locale={persian_fa}
            style={dataPickerStyle}
            calendarPosition="bottom-left"
            mapDays={({ date }) => {
              let props = {};
              let isWeekend = date.weekDay.index === 6;

              if (isWeekend) props.className = "highlight highlight-red";

              return props;
            }}
          />
        </div>

        <Typography sx={sxStyle}>انتخاب تاریخ تا:</Typography>
        <div style={dataPickerDivStyles}>
          <MaskedInput
            mask={[/\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/]}
            placeholder="----/--/--"
            value={endDate}
            onChange={handleMaskedInputChange}
            id="ENDDATE"
            render={(ref, props) => (
              <input ref={ref} {...props} style={maskInputStyle} />
            )}
          />
          <DatePicker
            value={endDate}
            render={<Icon />}
            onChange={handleENdPickerChange}
            calendar={persian}
            locale={persian_fa}
            style={dataPickerStyle}
            calendarPosition="bottom-left"
            mapDays={({ date }) => {
              let props = {};
              let isWeekend = date.weekDay.index === 6;

              if (isWeekend) props.className = "highlight highlight-red";

              return props;
            }}
          />
        </div>
        {error && (
          <Typography color="error" sx={sxStyle}>
            بازه انتخابی باید بین یک ماه باشد
          </Typography>
        )}
      </Box>
      <Button
        variant="contained"
        color="primary"
        sx={sxStyle}
        onClick={searchHandler}
      >
        جستجو
      </Button>
    </FormControl>
  );
}

export default TicketReportSarchTem;
