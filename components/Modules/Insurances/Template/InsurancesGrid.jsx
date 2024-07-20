import React, { useEffect, useState, useRef } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { SideBarModule } from "@ag-grid-enterprise/side-bar";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
import { MenuModule } from "@ag-grid-enterprise/menu";
import CustomLoadingOverlay from "../../../Template/customLoadingOverlay";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import "./style/gridStyle.css";
import localeText from "../../../../Constant/LocalText";
import { insuranceDef } from "../Constant/columnDef";

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  SideBarModule,
  ColumnsToolPanelModule,
  SetFilterModule,
  MenuModule,
]);

function InsurancesGrid({ ticketList, loading }) {
  const [pinedRow, setPinnedRow] = useState();
  const gridRef = useRef(null);

  const [customTicketList, setCustomTicketList] = useState([]);
  const containerStyle = {
    width: "100%",
    height: "100%",
  };
  const gridStyle = {
    height: "30rem",
    width: "100%",
    borderRadius: "8px",
    boxShadow:
      "0px 10px 15px -3px rgba(0,0,0,0.1),0px 10px 15px -3px rgba(0,0,0,0.1)",
  };

  const sideBar = {
    toolPanels: [
      {
        id: "columns",
        labelDefault: "Columns",
        labelKey: "columns",
        iconKey: "columns",
        toolPanel: "agColumnsToolPanel",
        hidden: true,
      },
      {
        id: "filters",
        labelDefault: "Filters",
        labelKey: "filters",
        iconKey: "filter",
        toolPanel: "agFiltersToolPanel",
      },
    ],
    defaultToolPanel: "filters",
    position: "left",
  };

  const defaultColDef = {
    filter: true,
    menuTabs: ["filterMenuTab", "generalMenuTab"],
    resizable: true,
  };

  useEffect(() => {
    if (loading) {
      // gridRef.current?.columnApi?.autoSizeAllColumns();
      gridRef.current?.api?.showLoadingOverlay();
    }
  }, [loading]);

  useEffect(() => {
    handleClearFilters();
  }, [ticketList]);

  const filterChangeHandler = (params) => {
    const filteredData = params.api
      .getModel()
      .rowsToDisplay.map((rowNode) => rowNode.data);
  };

  const handleGridReady = (params) => {
    gridRef.current = params;
    params.columnApi?.autoSizeAllColumns();
  };

  const handleClearFilters = () => {
    if (gridRef.current) {
      gridRef.current.api?.setFilterModel(null);
    }
  };

  const autoSizeStrategy = { type: "fitCellContents" };

  return (
    <div style={containerStyle} className="rtlContainer">
      <div style={gridStyle} className={"ag-theme-quartz rtl-grid"}>
        <AgGridReact
          ref={gridRef}
          columnDefs={insuranceDef}
          defaultColDef={defaultColDef}
          rowData={customTicketList}
          headerHeight={30}
          sideBar={sideBar}
          enableRtl
          localeText={localeText}
          pinnedBottomRowData={pinedRow}
          onFilterChanged={filterChangeHandler}
          autoSizeStrategy={autoSizeStrategy}
          onGridReady={handleGridReady}
          suppressColumnVirtualisation
          suppressMenuHide
          loadingOverlayComponent={() => <CustomLoadingOverlay />}
        />
      </div>
    </div>
  );
}

export default InsurancesGrid;
