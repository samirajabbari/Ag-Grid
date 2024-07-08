import React, { useContext, useEffect, useState } from "react";
import { serverContext } from "../../src/App";
import componiesList from "../../utiles/companiesList";
import convertData from "../../utiles/convertDate";
import Api from "../../api/api";
import validateDateRange from "../../utiles/validateDate";
import TicketReportSarchTem from "./TicketReportSarchTem";

function TicketReportSearch({ setTicketList, setLoading ,setToggel}) {
  const [selectedCompany, setSelectedCompany] = useState([]);
  const [selectedServer, setSelectedServer] = useState("");
  const { server } = useContext(serverContext);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [error, setError] = useState(false);

  const serverHandler = (e) => {
    setSelectedCompany([]); // در هر تغییر سرور لیست شرکت ها خالی بشه
    setSelectedServer(e.target.value);
  };

  const copmanyHandler = (e) => {
    if (e.target && e.target.value) {
      setSelectedCompany(e.target.value);
    }
  };

  useEffect(() => {
    setSelectedServer(server[1].id);
  }, []);

  const componies = componiesList(server, selectedServer);

  const searchHandler = async () => {
    const validateDate = validateDateRange(startDate, endDate);
    if (!validateDate) {
      setError(true);
      return;
    } else {
      setError(false);
    }

    let companiesToSend = selectedCompany.length
      ? selectedCompany
      : componies.map((company) => company.code);
      
      setLoading(true);


    const sDate = convertData(startDate);
    const eDate = convertData(endDate);
    setTicketList([]); // خالی کردن لیست در هر جستجو
    try {
      const res = await Api.get("/api/v1.0-rc/reports/tickets", {
        params: {
          serverId: selectedServer,
          startDepartureDate: `${sDate}`,
          endDepartureDate: `${eDate}`,
          companyCodesArray: `[${companiesToSend}]`,
        },
      });
      setTicketList(res.data);
     
    } catch (error) {
      setLoading(false);
      setTicketList([]);
      console.error("Error fetching tickets:", error);
      if (error.request.status === 404) {
        console.log("اطلاعاتی در بازه انتخابی پیدا نشد");
      }
    } finally {
      setLoading(false); // اطمینان از اجرای این خط بعد از try و catch
    }
  };

  return (
    <TicketReportSarchTem
      selectedServer={selectedServer}
      serverHandler={serverHandler}
      setSelectedServer={setSelectedServer}
      selectedCompany={selectedCompany}
      copmanyHandler={copmanyHandler}
      setEndDate={setEndDate}
      setStartDate={setStartDate}
      searchHandler={searchHandler}
      server={server}
      componies={componies}
      startDate={startDate}
      endDate={endDate}
      error={error}
      />
  );
}

export default TicketReportSearch;
