import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import { AgGridReact } from "@ag-grid-community/react";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { SideBarModule } from "@ag-grid-enterprise/side-bar";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
import { MenuModule } from "@ag-grid-enterprise/menu";

import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import "./Styles/styleGrid.css";
import columnDefs from "../../Constant/TicketRow";
import localeText from "../../Constant/LocalText";
import pinnedbuttonRow from "../../utiles/ticketPinnedrow";
import CustomLoadingOverlay from "./customLoadingOverlay";
import NoRowsOverlay from "./NoRowsOverlay";

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  SideBarModule,
  ColumnsToolPanelModule,
  SetFilterModule,
  MenuModule,
]);

function GridTicketReport({ ticketList, setLoading, loading }) {
  const [pinedRow, setPinnedRow] = useState();
  // const gridApiRef = useRef(null);
  const gridRef = useRef(null); // رفرنس گرید

  const [customTicketList, setCustomTicketList] = useState([]);
  const containerStyle = useMemo(
    () => ({
      width: "100%",
      height: "100%",
    }),
    []
  );
  const gridStyle = useMemo(
    () => ({
      height: "100%",
      width: "100%",
      borderRadius: "8px",
      boxShadow:
        "0px 10px 15px -3px rgba(0,0,0,0.1),0px 10px 15px -3px rgba(0,0,0,0.1)",
    }),
    []
  );

  const sideBar = useMemo(
    () => ({
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
    }),
    []
  );

  const defaultColDef =  {
      filter: true,
      menuTabs: ["filterMenuTab", "generalMenuTab"],
      resizable: true,
      // minWidth: 100,
  };

  useEffect(() => {
    if (loading) {
      gridRef.current?.columnApi?.autoSizeAllColumns();
      gridRef.current?.api?.showLoadingOverlay();
    }
  }, [loading]);

  useEffect(() => {
    let List = []; //برای اینکه هردفعه روی سرچ کلیک میشه لیست گرید خالی بشه
    if (ticketList?.tickets) {
      List = ticketList?.tickets?.map((item) => {
        return { ...item, AllPrice: item.pricePerOne * item.seatCounts };
      });
    }
    handleClearFilters();
    setCustomTicketList(List);

    const pinnedList = pinnedbuttonRow(List);
    setPinnedRow(pinnedList);
  }, [ticketList]);

  const filterChangeHandler = useCallback(
    (params) => {
      const filteredData = params.api
        .getModel()
        .rowsToDisplay.map((rowNode) => rowNode.data);
      const pinnedList = pinnedbuttonRow(filteredData);
      setPinnedRow(pinnedList);
    },
    [ticketList]
  );

  const handleGridReady = (params) => {
    gridRef.current = params;
    params.columnApi?.autoSizeAllColumns();
  };
  const customColumnDefs = () => {
    return columnDefs.map((colDef) => {
      if (colDef.field === "service.id") {
        return {
          ...colDef,
          filterParams: {
            tabs: ["filter"], // نمایش فقط تب فیلتر
          },
        };
      }
      return colDef;
    });
  };
  const handleClearFilters = () => {
    console.log(gridRef);
    if (gridRef.current) {
      gridRef.current.api?.setFilterModel(null);
    }
  };
  const gridOptions = {
    getRowClass: (params) => {
      if (params.node.rowPinned) {
        return "my-pinned-row";
      }
      return null;
    },
  };
  // const autoSizeStrategy = () => {
  //   gridRef.current.api.sizeColumnsToFit();
  // };

  const autoSizeStrategy = { type: "fitCellContents" };

  return (
    <div style={containerStyle} className="rtlContainer">
      <div style={gridStyle} className={"ag-theme-quartz rtl-grid"}>
        <AgGridReact
          ref={gridRef}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowData={customTicketList}
          // headerHeight={30}
          // domLayout="rtl"
          sideBar={sideBar}
          enableRtl
          localeText={localeText}
          pinnedBottomRowData={pinedRow}
          onFilterChanged={filterChangeHandler}
          autoSizeStrategy={autoSizeStrategy}
          onGridReady={handleGridReady}
          gridOptions={gridOptions}
          suppressColumnVirtualisation
          suppressMenuHide
          loadingOverlayComponent={() => <CustomLoadingOverlay />}
          // noRowsOverlayComponent={loading ? customTicketList : NoRowsOverlay}
        />
      </div>
    </div>
  );
}

export default GridTicketReport;
