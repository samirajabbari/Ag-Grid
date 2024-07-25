import React, { useEffect, useRef, useState } from "react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";

import { Grid } from "../../../shared/Grid";
import {
  insuranceDef,
  insuranceDetailDef,
  charter_abroadDef,
  CharterDetailDef,
  abroadDetailDef,
} from "../Constant/columnDef";
function InsurancesGrid({ data, isFetching, tripTypeCode, detailKey }) {
  const parentGridRef = useRef(null);

  return (
    <Grid
      parentGridRef={parentGridRef}
      columnDefs={
        tripTypeCode === "interCity" ? insuranceDef : charter_abroadDef
      }
      pinnedBottomRowData={[]}
      masterDetail={true}
      insuranceDetailDef={
        tripTypeCode === "interCity"
          ? insuranceDetailDef
          : tripTypeCode === "charter"
          ? CharterDetailDef
          : abroadDetailDef
      }
      data={data}
      isFetching={isFetching}
      groupName="نوع ماشین"
      detailKey={detailKey}
    />
  );
}

export default InsurancesGrid;
