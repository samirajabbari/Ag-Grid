import React, { useRef, useState } from "react";
import styles from "./Styles/TicketsReports.module.css";
import TicketReportSearch from "../Template/TicketReportSearch";
import GridTicketReport from "../Template/GridTicketReport";
function TicketReports() {
  const [ticketList, setTicketList] = useState();
  const [loading, setLoading] = useState(false);
  const [toggel, setToggel] = useState(true);

  return (
    <div className={styles.ticketsReport}>
      <div className={styles.left}>
        <TicketReportSearch
          setTicketList={setTicketList}
          ticketList={ticketList}
          setLoading={setLoading}
        />
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
