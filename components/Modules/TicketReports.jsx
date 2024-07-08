import React, { useRef, useState } from "react";
import styles from "./Styles/TicketsReports.module.css";
import TicketReportSearch from "../Template/TicketReportSearch";
import GridTicketReport from "../Template/GridTicketReport";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
function TicketReports() {
  const [ticketList, setTicketList] = useState();
  const [loading, setLoading] = useState(false);
  const [toggel, setToggel] = useState(false);
  const toggelHandler = () => {
    console.log(toggel);
    setToggel(!toggel);
  };
  return (
    <div className={styles.ticketsReport}>
      <div className={styles.left} style={{ width: toggel ? "30rem" : "2rem" }}>
        <button className={styles.toggel} onClick={toggelHandler}>
          {toggel ? <ArrowCircleRightIcon /> : <ArrowCircleLeftIcon />}
        </button>
        {toggel && (
          <TicketReportSearch
            setTicketList={setTicketList}
            ticketList={ticketList}
            setLoading={setLoading}
            setToggel={setToggel}
          />
        )}
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
