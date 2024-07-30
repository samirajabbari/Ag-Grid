import React, { useEffect, useRef, useState } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import { Grid } from "../../../shared";
import {
  insuranceDef,
  insuranceDetailDef,
  charter_abroadDef,
  CharterDetailDef,
  abroadDetailDef,
} from "../Constant/columnDef";
function InsurancesGrid({
  data,
  isFetching,
  tripTypeCode,
  detailKey,
  serverId,
}) {
  const parentGridRef = useRef(null);
  const getRowData = (params) => {
    const data = params?.data?.rates.map((child) => {
      return {
        ...child,
        parentId: params.data.id,
        serverId: serverId,
      };
    });
    return data;
  };
  const addColumonData = (data) => {
    const newData = data?.map((item) => {
      return {
        ...item,
        serverId: serverId,
        tripTypeCode: tripTypeCode,
        rowId: item.id,
      };
    });
    return newData;
  };
  return (
    <Grid
      parentGridRef={parentGridRef}
      columnDefs={
        tripTypeCode === "interCity" ? insuranceDef : charter_abroadDef
      }
      getRowData={getRowData}
      pinnedBottomRowData={[]}
      masterDetail={true}
      insuranceDetailDef={
        tripTypeCode === "interCity"
          ? insuranceDetailDef
          : tripTypeCode === "charter"
          ? CharterDetailDef
          : abroadDetailDef
      }
      data={addColumonData(data)}
      isFetching={isFetching}
      groupName="نوع ماشین"
      // detailKey={detailKey}
    />
  );
}

export default InsurancesGrid;
