import React, { useEffect, useRef } from "react";
import { Box, MenuItem, Typography } from "@mui/material";
import "./Styles/search.css";
import convertMiladiToShamsi from "../../utiles/MiladitoPersian";

import { useForm } from "react-hook-form"; // 1. Import useForm and Controller
import { Button, Select, Autocomplete, DatePicker } from "../shared";

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
  toggle,
  setSearchData,
  searchData,
}) {
  const { handleSubmit, setValue, control } = useForm();

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

  return (
    <>
      <form
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
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
          <Select
            label={"سرور"}
            name={"serverId"}
            control={control}
            defaultValue={searchData?.serverId}
            controlStyle={{ mt: 5 }}
            style={sxStyle}
            onChange={(e) =>
              setSearchData((prev) => ({
                ...prev,
                componies: "",
                serverId: e.target.value,
              }))
            }
          >
            {server.map((serverItem) => (
              <MenuItem key={serverItem.id} value={serverItem.id} sx={sxStyle}>
                {serverItem.description}
              </MenuItem>
            ))}
          </Select>

          <Autocomplete
            label={"شرکت‌ها"}
            name={"componies"}
            control={control}
            defaultValue={searchData.componies || []}
            style={sxStyle}
            options={componies}
            getOptionLabel={(option) => option?.name}
            onChange={(e, newValue) =>
              setSearchData((prev) => ({
                ...prev,
                componies: newValue.map((item) => item.code),
              }))
            }
          />

          <DatePicker
            label="از تاریخ:"
            name="startDate"
            control={control}
            id="STARTDATE"
            value={searchData.startDate}
            handleMaskedInputChange={handleMaskedInputChange}
            handleStartPickerChange={handleStartPickerChange}
            handleTodayDate={handleTodayDate}
            maskInputStyle={maskInputStyle}
            sxStyle={sxStyle}
            datePickerRef={startDatePickerRef}
          />
          <DatePicker
            label="تا تاریخ:"
            name="endDate"
            control={control}
            id="ENDDATE"
            value={searchData.endDate}
            handleMaskedInputChange={handleMaskedInputChange}
            handleStartPickerChange={handleEndPickerChange}
            handleTodayDate={handleTodayDate}
            maskInputStyle={maskInputStyle}
            sxStyle={sxStyle}
            datePickerRef={endDatePickerRef}
          />
        </Box>
      </form>
      <Button style={{ ...sxStyle, width: "100%" }} onClick={searchHandler} />
    </>
  );
}

export default TicketReportSarchTem;
