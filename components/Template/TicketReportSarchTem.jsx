import React from "react";
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
import "./Styles/search.css";

const sxStyle = { marginTop: "1rem", fontFamily: "IranSans", fontWeight: 200 };
const dataPickerStyle = {
  width: "95%",
  padding: "0.5rem",
  marginTop: "1rem",
  fontSize: "1rem",
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
        <DatePicker
          value={startDate}
          onChange={setStartDate}
          calendar={persian}
          locale={persian_fa}
          style={dataPickerStyle}
          calendarPosition="bottom-right"
        />
        <Typography sx={sxStyle}>انتخاب تاریخ تا:</Typography>
        <DatePicker
          value={endDate}
          onChange={setEndDate}
          calendar={persian}
          locale={persian_fa}
          style={dataPickerStyle}
          calendarPosition="bottom-right"
        />
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
