import React, { useEffect, useRef } from "react";
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
import { useForm, Controller } from "react-hook-form"; // 1. Import useForm and Controller

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

  searchHandler,
  server,
  componies,
  error,
  setSearchData,
  searchData,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    control,
    formState: { errors },
  } = useForm(); // 2. Initialize useForm

  const startDatePickerRef = useRef(null);
  const endDatePickerRef = useRef(null);

  useEffect(() => {
    setValue("serverId", searchData?.serverId || "");
    setValue("componies", searchData?.componies || []);
    setValue("startDate", searchData?.startDate || "");
    setValue("endDate", searchData?.endDate || "");
  }, [searchData, setValue]);

  const handleMaskedInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "STARTDATE") {
      setSearchData((prev) => ({ ...prev, startDate: value }));
      setValue("startDate", value);
    } else {
      setSearchData((prev) => ({ ...prev, endDate: value }));
      setValue("endDate", value);
    }
  };

  const handleStartPickerChange = (date) => {
    const formattedDate = `${date.year}/${date.month
      .toString()
      .padStart(2, "0")}/${date.day.toString().padStart(2, "0")}`;
    setSearchData((prev) => ({ ...prev, startDate: formattedDate }));
    setValue("startDate", formattedDate);
  };

  const handleEndPickerChange = (date) => {
    const formattedDate = `${date.year}/${date.month
      .toString()
      .padStart(2, "0")}/${date.day.toString().padStart(2, "0")}`;
    setSearchData((prev) => ({ ...prev, endDate: formattedDate }));
    setValue("endDate", formattedDate);
  };

  const handleTodayDate = (id, date) => {
    const convertDate = convertMiladiToShamsi(date, "D");
    if (id === "STARTDATE") {
      setSearchData((prev) => ({ ...prev, startDate: convertDate }));
      setValue("startDate", convertDate);
      if (startDatePickerRef.current) {
        startDatePickerRef.current.closeCalendar();
      }
    } else {
      setSearchData((prev) => ({ ...prev, endDate: convertDate }));
      setValue("endDate", convertDate);
      if (endDatePickerRef.current) {
        endDatePickerRef.current.closeCalendar();
      }
    }
  };

  const onSubmit = (data) => {
    setSearchData(data);
    searchHandler();
  };

  return (
    <form
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      onSubmit={handleSubmit(onSubmit)}
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
          <Controller
            name="serverId"
            control={control}
            defaultValue={searchData?.serverId}
            render={({ field }) => (
              <Select
                {...field}
                sx={sxStyle}
                value={field.value}
                onChange={(e) => {
                  field.onChange(e);
                  setSearchData((prev) => ({
                    ...prev,
                    componies:"",
                    serverId: e.target.value,
                  }));
                }}
              >
                {server.map((serverItem) => (
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
        <FormControl fullWidth>
          <InputLabel shrink sx={sxStyle}>
            شرکت ها
          </InputLabel>
          <Controller
            name="componies"
            control={control}
            defaultValue={searchData.componies || []}
            render={({ field }) => (
              <Autocomplete
                {...field}
                multiple
                options={componies}
                getOptionLabel={(option) => option.name}
                value={componies.filter((item) =>
                  field.value.includes(item.code)
                )}
                onChange={(event, newValue) => {
                  field.onChange(newValue.map((item) => item.code));
                  setSearchData((prev) => ({
                    ...prev,
                    componies: newValue.map((item) => item.code),
                  }));
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
                    placeholder={field.value.length ? null : "همه"}
                  />
                )}
              />
            )}
          />
        </FormControl>
        <FormControl>
          <Box className="dataPickerDivStyles">
            <InputLabel shrink sx={sxStyle}>
              از تاریخ:
            </InputLabel>
            <Controller
              name="startDate"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
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
                    value={searchData.startDate}
                    onChange={(e) => {
                      handleMaskedInputChange(e);
                      field.onChange(e.target.value);
                    }}
                    id="STARTDATE"
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
                  <DatePicker
                    ref={startDatePickerRef}
                    value={searchData.startDate}
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

                      if (isWeekend)
                        props.className = "highlight highlight-red";

                      return props;
                    }}
                  >
                    <button
                      className="datePickeButtom"
                      onClick={() =>
                        handleTodayDate("STARTDATE", new persianDate())
                      }
                    >
                      امروز
                    </button>
                  </DatePicker>
                </>
              )}
            />
          </Box>
        </FormControl>
        <FormControl>
          <InputLabel shrink sx={sxStyle}>
            تا تاریخ
          </InputLabel>
          <Box className="dataPickerDivStyles">
            <Controller
              name="endDate"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
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
                    value={searchData.endDate}
                    onChange={(e) => {
                      handleMaskedInputChange(e);
                      field.onChange(e.target.value);
                    }}
                    id="ENDDATE"
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
                  <DatePicker
                    ref={endDatePickerRef}
                    value={searchData.endDate}
                    render={<Icon />}
                    onChange={(date) => {
                      handleEndPickerChange(date);
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

                      if (isWeekend)
                        props.className = "highlight highlight-red";

                      return props;
                    }}
                  >
                    <button
                      className="datePickeButtom"
                      onClick={() =>
                        handleTodayDate("ENDDATE", new persianDate())
                      }
                    >
                      امروز
                    </button>
                  </DatePicker>
                </>
              )}
            />
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
        type="submit"
      >
        جستجو
      </Button>
    </form>
  );
}

export default TicketReportSarchTem;
