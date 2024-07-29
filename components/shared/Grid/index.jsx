import React, { useEffect, useRef } from "react";
import localeText from "./constant/LocalText";
import CustomLoadingOverlay from "./Loader/customLoadingOverlay";
import PropTypes from "prop-types";
import { EnterpriseCoreModule } from "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./style/styleGrid.css";

const Grid = ({
  parentGridRef,
  columnDefs,
  pinnedBottomRowData,
  masterDetail,
  insuranceDetailDef,
  data,
  isFetching,
  detailKey,
  getRowData,
  groupName,
  onFilterChange,
}) => {
  const gridRef = useRef(null);
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
    if (isFetching) {
      gridRef.current?.api?.showLoadingOverlay();
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
  const onRefreshMasterGrid = () => {
    gridRef.current?.api?.refreshCells();
  };
  const handleGridReady = (params) => {
    gridRef.current.api.refreshCells();
    gridRef.current = params;
    params.columnApi?.autoSizeAllColumns();
  };

  const gridOptions = {
    getRowClass: (params) => {
      if (params.node.rowPinned) {
        return "my-pinned-row";
      }
      return null;
    },
    // context: { parentData: null },
  };

  const autoSizeStrategy = { type: "fitCellContents" };

  const onRowGroupOpened = (params) => {
    if (params.node.expanded) {
      gridRef.current?.columnApi?.autoSizeAllColumns();
    }
  };

  return (
    <div style={containerStyle} className="rtlContainer">
      <div style={gridStyle} className="ag-theme-alpine rtl-grid">
        <AgGridReact
          key={JSON.stringify(data)} // Ensure grid is reset when data changes
          ref={gridRef}
          masterDetail={masterDetail}
          onGridReady={handleGridReady}
          detailCellRendererParams={{
            detailGridOptions: {
              localeText,
              enableRtl: true,
              columnDefs: insuranceDetailDef,
              rowClass: "detail-row",
              defaultColDef: {
                filter: true,
                menuTabs: ["filterMenuTab", "generalMenuTab"],
                resizable: true,
              },
              context: { parentData: null },
            },
            getDetailRowData: (params) => {
              const rowData = getRowData(params);
              // const detailData = params.data[detailKey];
              if (rowData) {
                params.successCallback(rowData);
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
          modules={[EnterpriseCoreModule]}
          localeText={localeText}
          pinnedBottomRowData={pinnedBottomRowData}
          onFilterChanged={filterChangeHandler}
          autoSizeStrategy={autoSizeStrategy} // grid column size
          gridOptions={gridOptions}
          onRowGroupOpened={onRowGroupOpened}
          suppressColumnVirtualisation // grid column size
          suppressMenuHide // filter menu show
          loadingOverlayComponent={CustomLoadingOverlay}
          autoGroupColumnDef={{
            headerName: groupName,
            filter: "agGroupColumnFilter",
          }}
        />
      </div>
    </div>
  );
};

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

export { Grid };
