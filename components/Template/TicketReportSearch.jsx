import React, { useContext, useEffect, useState } from "react";
import { serverContext } from "../../src/App";
import componiesList from "../../utiles/companiesList";
import convertData from "../../utiles/convertDate";
import validateDateRange from "../../utiles/validateDate";
import TicketReportSarchTem from "./TicketReportSarchTem";
import convertMiladiToShamsi from "../../utiles/MiladitoPersian";
import persianDate from "persian-date";
import { useQuery } from "@tanstack/react-query";
import { getTicketReport } from "../../api/fetchData";
import toast from "react-hot-toast";

function TicketReportSearch({ setTicketList, setLoading, setToggel }) {
  const { server } = useContext(serverContext);

  const [error, setError] = useState(false);
  const [searchData, setSearchData] = useState({
    serverId: server ? (server[1] ? server[1].id : server[0].id) : "",
    componies: "",
    startDate: "",
    endDate: "",
  });
  const [fetchData, setFetchData] = useState();
  const [isSearchEnabled, setIsSearchEnabled] = useState(false);
  const {
    data,
    isFetching,
    error: queryError,
    refetch,
  } = useQuery({
    queryKey: ["getTicketReport", fetchData],
    queryFn: getTicketReport,
    enabled: isSearchEnabled,
    retry: 1,
    refetchOnWindowFocus: false,
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
    setTicketList([]);

    setLoading(isFetching);
    const validateDate = validateDateRange(
      searchData.startDate,
      searchData.endDate
    );
    if (!validateDate) {
      setError(true);
      return;
    } else {
      setError(false);
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

    setIsSearchEnabled(true);
    setLoading(true);
    refetch();
  };

  useEffect(() => {
    if (!isFetching) {
      setTicketList(data);
      setLoading(false);
      setIsSearchEnabled(false);
    }
  }, [isFetching]);

  useEffect(() => {
    if (queryError) {
      console.log(queryError);
      if (queryError.response.status === 404) {
        toast.error("اطلاعاتی در بازه انتخابی یافت نشد");
      }
      // setLoading(false);
      setTicketList([]);
      setIsSearchEnabled(false);
    }
  }, [queryError, setLoading, setTicketList]);

  return (
    <TicketReportSarchTem
      searchHandler={searchHandler}
      error={error}
      searchData={searchData}
      setSearchData={setSearchData}
      componies={componies}
      server={server}
    />
  );
}

export default TicketReportSearch;
