import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
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
import convertMiladiToShamsi from "../../utiles/MiladitoPersian";
import persianDate from "persian-date";

const sxStyle = {
  marginTop: "1rem",
  fontFamily: "IranSans",
  fontWeight: 200,
};

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
  const [shouldCloseCalendar, setShouldCloseCalendar] = useState(false);
  const startDatePickerRef = useRef(null);
  const endDatePickerRef = useRef(null);
  const handleMaskedInputChange = (e) => {
    if (e.target.id === "STARTDATE") {
      setStartDate(e.target.value);
    } else {
      setEndDate(e.target.value);
    }
  };
  const handleStartPickerChange = (date) => {
    const formattedDate = `${date.year}/${date.month
      .toString()
      .padStart(2, "0")}/${date.day.toString().padStart(2, "0")}`;
    setStartDate(formattedDate);
  };
  const handleENdPickerChange = (date) => {
    const formattedDate = `${date.year}/${date.month
      .toString()
      .padStart(2, "0")}/${date.day.toString().padStart(2, "0")}`;
    setEndDate(formattedDate);
  };
  const handelTodayDate = (id, date) => {
    const convertDate = convertMiladiToShamsi(date, "D");
    console.log(convertDate);
    if (id === "STARTDATE") {
      setStartDate(convertDate);
      if (startDatePickerRef.current) {
        startDatePickerRef.current.closeCalendar();
      }
      return;
    }

    setEndDate(convertDate);
    if (endDatePickerRef.current) {
      endDatePickerRef.current.closeCalendar();
      return;
    }
  };

  return (
    <FormControl
      fullWidth
      variant="outlined"
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
        <FormControl fullWidth sx={{ mt: 5 }}>
          <InputLabel shrink sx={sxStyle}>
            سرور
          </InputLabel>
          <Select sx={sxStyle} value={selectedServer} onChange={serverHandler}>
            {server.map((serverItem) => (
              <MenuItem key={serverItem.id} value={serverItem.id} sx={sxStyle}>
                {serverItem.description}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel shrink sx={sxStyle}>
            شرکت ها
          </InputLabel>
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
        </FormControl>
        <FormControl>
          <Box className="dataPickerDivStyles">
            <InputLabel shrink sx={sxStyle}>
              از تاریخ:
            </InputLabel>
            <MaskedInput
              mask={[/\d/, /\d/, /\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/]}
              placeholder="----/--/--"
              value={startDate}
              onChange={handleMaskedInputChange}
              id="STARTDATE"
              render={(ref, props) => (
                <input
                  ref={ref}
                  {...props}
                  style={maskInputStyle}
                  autoComplete="off"
                />
              )}
              Autocomplete={false}
            />
            <DatePicker
              ref={startDatePickerRef}
              value={startDate}
              render={<Icon />}
              onChange={handleStartPickerChange}
              calendar={persian}
              locale={persian_fa}
              // className="dataPickerStyle"
              calendarPosition="bottom-left"
              mapDays={({ date }) => {
                let props = {};
                let isWeekend = date.weekDay.index === 6;

                if (isWeekend) props.className = "highlight highlight-red";

                return props;
              }}
            >
              {" "}
              <button
                className="datePickeButtom"
                onClick={() => handelTodayDate("STARTDATE", new persianDate())}
              >
                امروز
              </button>
            </DatePicker>
          </Box>
        </FormControl>
        <FormControl>
          <InputLabel shrink sx={sxStyle}>
            تا تاریخ
          </InputLabel>
          <Box className="dataPickerDivStyles">
            <MaskedInput
              mask={[/\d/, /\d/, /\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/]}
              placeholder="----/--/--"
              value={endDate}
              onChange={handleMaskedInputChange}
              id="ENDDATE"
              render={(ref, props) => (
                <input
                  ref={ref}
                  {...props}
                  style={maskInputStyle}
                  autoComplete="off"
                />
              )}
            />
            <DatePicker
              ref={endDatePickerRef}
              value={endDate}
              render={<Icon />}
              onChange={handleENdPickerChange}
              calendar={persian}
              locale={persian_fa}
              // style={dataPickerStyle}
              calendarPosition="bottom-left"
              mapDays={({ date }) => {
                let props = {};
                let isWeekend = date.weekDay.index === 6;

                if (isWeekend) props.className = "highlight highlight-red";

                return props;
              }}
            >
              <button
                className="datePickeButtom"
                onClick={() => handelTodayDate("ENDDATE", new persianDate())}
              >
                امروز
              </button>
            </DatePicker>
          </Box>
        </FormControl>
        {error && (
          <Typography color="error" sx={sxStyle}>
            بازه انتخابی باید بین یک ماه باشد
          </Typography>
        )}
      </Box>
      <Button
        variant="contained"
        color="primary"
        sx={{ ...sxStyle, width: "100%" }}
        onClick={searchHandler}
      >
        جستجو
      </Button>
    </FormControl>
  );
}

export default TicketReportSarchTem;
