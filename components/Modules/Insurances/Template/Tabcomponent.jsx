import { Box, MenuItem, Stack } from "@mui/material";
import { Select } from "../../../shared";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TabTitle } from "../Constant/TabTitle";
import {
  sxStyle,
  stackStyle,
  active,
  boxStyle,
} from "../Constant/elementStyle";

function Tabcomponent({
  setSearchData,
  server,
  setIsSearchEnabled,
  tripTypeCode,
  setTripTypeCode,
  searchData,
}) {
  const [tabSelected, settabSelected] = useState("interCity");
  const { control, setValue } = useForm();

  const tabChangeHandler = (e) => {
    settabSelected(e.target.id);
    setSearchData((prevData) => ({
      ...prevData,
      tripTypeCode: e.target.id,
    }));
    setTripTypeCode(e.target.id);
    setIsSearchEnabled(true);
  };

  useEffect(() => {
  }, [searchData]);

  return (
    <div>
      <Select
        variant="standard"
        label={"سرور"}
        name={"serverId"}
        control={control}
        defaultValue={server[0].id}
        controlStyle={{ mt: 5, width: "30%" }}
        style={sxStyle}
        onChange={(e) =>
          setSearchData((prev) => ({
            ...prev,
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

      <Stack
        spacing={2}
        direction="row"
        alignItems="center"
        sx={stackStyle}
        pr={5}
      >
        {TabTitle.map((tab) => {
          return (
            <Box
              key={tab.id}
              sx={{ ...boxStyle, ...(tabSelected === tab.id && active) }}
              id={tab.id}
              onClick={tabChangeHandler}
            >
              {tab.title}
            </Box>
          );
        })}
      </Stack>
    </div>
  );
}

export default Tabcomponent;
