import React, { useContext, useEffect, useState } from "react";
import { serverContext } from "../../src/App";
import componiesList from "../../utiles/companiesList";
import convertData from "../../utiles/convertDate";
import validateDateRange from "../../utiles/validateDate";
import TicketReportSarchTem from "./TicketReportSarchTem";
import convertMiladiToShamsi from "../../utiles/MiladitoPersian";
import persianDate from "persian-date";
import toast from "react-hot-toast";

function TicketReportSearch({
  toggel,
  setFetchData,
  setIsSearchEnabled,
  setIsError,
  isError,
}) {
  const { server } = useContext(serverContext);

  const [searchData, setSearchData] = useState({
    serverId: server ? (server[1] ? server[1].id : server[0].id) : "",
    componies: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    const persianDateInstance = new persianDate();
    persianDateInstance.toCalendar("persian");
    const FisrtDayOfMounth = convertMiladiToShamsi(
      persianDateInstance.startOf("month").State.gDate,
      "D"
    );
    const today = convertMiladiToShamsi(persianDateInstance.State.gDate, "D");

    setSearchData({
      ...searchData,
      startDate: FisrtDayOfMounth,
      endDate: today,
    });
  }, [server]);

  const componies = componiesList(server, searchData?.serverId);

  const searchHandler = () => {
    setIsSearchEnabled(true);

    const validateDate = validateDateRange(
      searchData.startDate,
      searchData.endDate
    );
    if (!validateDate) {
      setIsError(true);
      toast.error("بازه انتخابی نباید بیشتر از یک ماه باشد");
      setIsSearchEnabled(false);
      return;
    } else {
      setIsError(false);
    }
    let companiesToSend = searchData?.componies?.length
      ? searchData.componies
      : componies.map((company) => company.code);

    const sDate = convertData(searchData.startDate);
    const eDate = convertData(searchData.endDate);

    setFetchData({
      serverId: searchData.serverId,
      startDate: sDate,
      endDate: eDate,
      companies: companiesToSend,
    });
    // refetch();
  };

  return (
    toggel && (
      <TicketReportSarchTem
        searchHandler={searchHandler}
        
        searchData={searchData}
        setSearchData={setSearchData}
        componies={componies}
        server={server}
      />
    )
  );
}

export default TicketReportSearch;
