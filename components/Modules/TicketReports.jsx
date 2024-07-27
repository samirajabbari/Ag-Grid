import React, { useEffect, useRef, useState } from "react";
import styles from "./Styles/TicketsReports.module.css";
import TicketReportSearch from "../Template/TicketReportSearch";
import GridTicketReport from "../Template/GridTicketReport";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import columnDefs from "../../Constant/TicketRow";
import pinnedbuttonRow from "../../utiles/ticketPinnedrow";
import { Grid } from "../shared";
import { useQuery } from "@tanstack/react-query";
import { getTicketReport } from "../../api/fetchData";
import toast from "react-hot-toast";
function TicketReports() {
  const [ticketList, setTicketList] = useState();
  const [toggel, setToggel] = useState(true);
  const [isError, setIsError] = useState(false);

  const [pinnedRows, setPinnedRows] = useState([]);
  const parentRef = useRef(null);
  const [fetchData, setFetchData] = useState("");
  const [isSearchEnabled, setIsSearchEnabled] = useState(false);

  const { data, isFetching } = useQuery({
    queryKey: ["getTicketReport", fetchData],
    queryFn: getTicketReport,
    enabled: isSearchEnabled,
    retry: 1,
    staleTime: 0,
    cacheTime: 0,

    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    console.log("isfetching:", isFetching);
    let List = [];
    setTicketList([]);

    if (!isFetching) {
      if (data?.tickets) {
        List = data?.tickets?.map((item) => {
          return { ...item, AllPrice: item.pricePerOne * item.seatCounts };
        });
      }

      setTicketList(List);
      setIsSearchEnabled(false);
    }
  }, [data, isFetching]);
  const toggelHandler = () => {
    setToggel(!toggel);
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setToggel(false);
      } else {
        setToggel(true);
      }
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handleFilterChange = (filteredData) => {
    const pinnedList = pinnedbuttonRow(filteredData);
    setPinnedRows(pinnedList);
  };
  useEffect(() => {
    const pinnedList = pinnedbuttonRow(ticketList);
    setPinnedRows(pinnedList);
  }, [ticketList]);

  useEffect(() => {
    if (data?.response?.status === 404) {
      setIsSearchEnabled(false);

      toast.error("اطلاعاتی در بازه انتخابی یافت نشد");
      setTicketList([]);
    }
  }, [data]);

  return (
    <div className={styles.ticketsReport}>
      <div
        className={styles.left}
        style={{
          width: toggel ? "30rem" : "2rem",
          transition: toggel ? null : "width 0.5s ease",
        }}
      >
        <button className={styles.toggel} onClick={toggelHandler}>
          {toggel ? <ArrowCircleRightIcon /> : <ArrowCircleLeftIcon />}
        </button>
        {
          <TicketReportSearch
            setTicketList={setTicketList}
            ticketList={ticketList}
            setToggel={setToggel}
            toggel={toggel}
            isError={isError}
            setIsError={setIsError}
            setFetchData={setFetchData}
            setIsSearchEnabled={setIsSearchEnabled}
          />
        }
      </div>
      <div className={styles.right}>
        {/* <GridTicketReport
          ticketList={ticketList}
          setLoading={setLoading}
          loading={loading}
        /> */}
        <Grid
          parentGridRef={parentRef}
          columnDefs={columnDefs}
          pinnedBottomRowData={pinnedRows}
          masterDetail={false}
          insuranceDetailDef={null}
          data={ticketList}
          isFetching={isFetching}
          groupName=""
          detailKey={""}
          onFilterChange={handleFilterChange}
        />
      </div>
    </div>
  );
}

export default TicketReports;
