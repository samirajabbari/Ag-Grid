import React, { useEffect, useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "./style/styleGrid.css";
import localeText from "./constant/LocalText";
import CustomLoadingOverlay from "./Loader/customLoadingOverlay";
import PropTypes from "prop-types";
import { EnterpriseCoreModule } from "ag-grid-enterprise";
import { AllModules } from "@ag-grid-enterprise/all-modules";

function Grid({
  parentGridRef,
  columnDefs,
  pinnedBottomRowData,
  masterDetail,
  insuranceDetailDef,
  data,
  isFetching,
  detailKey,
  groupName,
  onFilterChange,
}) {
  const gridRef = useRef();

  const containerStyle = {
    width: "100%",
    height: "100%",
  };
  const gridStyle = {
    height: "100%",
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
      },
      {
        id: "filters",
        labelDefault: "Filters",
        labelKey: "filters",
        iconKey: "filter",
        toolPanel: "agFiltersToolPanel",
      },
    ],
    position: "left",
  };

  const defaultColDef = {
    filter: true,
    menuTabs: ["filterMenuTab", "generalMenuTab"],
    resizable: true,
  };

  useEffect(() => {
    console.log("Grid", isFetching);
    console.log(gridRef.current);
    if (isFetching) {
      gridRef.current?.api?.showLoadingOverlay();
      gridRef.current?.columnApi?.autoSizeAllColumns();
    } else {
      gridRef.current?.api?.hideOverlay();
    }
  }, [isFetching]);

  const filterChangeHandler = (params) => {
    const filteredData = params.api
      .getModel()
      .rowsToDisplay.map((rowNode) => rowNode.data);

    onFilterChange(filteredData);
  };

  // const getId = () => {
  //   gridRef.current.api.
  // }

  const handleGridReady = (params) => {
    gridRef.current = params;
    params.columnApi?.autoSizeAllColumns();
  };

  // const handleClearFilters = () => {
  //   if (gridRef.current) {
  //     gridRef.current.api?.setFilterModel(null);
  //   }
  // };

  const gridOptions = {
    getRowClass: (params) => {
      if (params.node.rowPinned) {
        return "my-pinned-row";
      }
      return null;
    },
  };
  useEffect(() => {
    console.log(gridRef.current.api);
  }, []);
  const autoSizeStrategy = { type: "fitCellContents" };

  return (
    <div style={containerStyle} className="rtlContainer">
      <div style={gridStyle} className={"ag-theme-quartz rtl-grid"}>
        <AgGridReact
          key={JSON.stringify(data)} // Ensure grid is reset when data changes
          ref={gridRef}
          masterDetail={masterDetail}
          detailCellRendererParams={{
            detailGridOptions: {
              localeText,
              enableRtl: true,
              columnDefs: insuranceDetailDef,
              rowClass: "detail-row",
              defaultColDef: {
                flex: 1,
              },
              // context: { parentData: null },
            },
            getDetailRowData: (params) => {
              const detailData = params.data[detailKey];
              if (detailData) {
                params.successCallback(detailData);

                // params.api.gridOptionsWrapper.gridOptions.context.parentData =
                //   params.data;
              } else {
                params.successCallback([]);
              }
            },
          }}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowData={data}
          headerHeight={30}
          sideBar={sideBar}
          enableRtl
          modules={AllModules}
          localeText={localeText}
          pinnedBottomRowData={pinnedBottomRowData}
          onFilterChanged={filterChangeHandler}
          autoSizeStrategy={autoSizeStrategy} //grid column size
          onGridReady={handleGridReady}
          gridOptions={gridOptions}
          suppressColumnVirtualisation //grid column size
          suppressMenuHide //filter menu show
          loadingOverlayComponent={() => <CustomLoadingOverlay />}
          autoGroupColumnDef={{
            headerName: groupName,
            filter: "agGroupColumnFilter",
          }}
        />
      </div>
    </div>
  );
}

export { Grid };

Grid.propTypes = {
  parentGridRef: PropTypes.any,
  columnDefs: PropTypes.array.isRequired,
  pinnedBottomRowData: PropTypes.array,
  masterDetail: PropTypes.bool,
  insuranceDetailDef: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  detailKey: PropTypes.string.isRequired,
  groupName: PropTypes.string,
  onFilterChange: PropTypes.func,
};
