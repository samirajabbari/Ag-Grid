import React, { useEffect, useRef, useState } from "react";
import styles from "./Styles/TicketsReports.module.css";
import TicketReportSearch from "../Template/TicketReportSearch";
import GridTicketReport from "../Template/GridTicketReport";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
function TicketReports() {
  const [ticketList, setTicketList] = useState();
  const [loading, setLoading] = useState(false);
  const [toggel, setToggel] = useState(true);
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
            setLoading={setLoading}
            setToggel={setToggel}
            toggel={toggel}
          />
        }
      </div>
      <div className={styles.right}>
        <GridTicketReport
          ticketList={ticketList}
          setLoading={setLoading}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default TicketReports;
