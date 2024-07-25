import React, { useContext, useEffect, useState } from "react";
import { serverContext } from "../../../../src/App";
import Tabcomponent from "./Tabcomponent";
import InsurancesGrid from "./InsurancesGrid";
import styles from "./style/InsuranceReport.module.css";
import { useQuery } from "@tanstack/react-query";
import { insuranceList } from "../../../../api/fetchData";

function InsurancesReport() {
  const { server } = useContext(serverContext);
  const [serverId, setServerId] = useState("");
  const [tripTypeCode, setTripTypeCode] = useState("interCity");
  const [searchData, setSearchData] = useState();
  const [isSearchEnabled, setIsSearchEnabled] = useState(false);

  useEffect(() => {
    if (server && server.length > 0) {
      setServerId(server[0].id);
      setSearchData({ serverId: server[0].id, tripTypeCode });
    }
  }, [server]);

  const {
    data,
    isFetching,
    error: queryError,
    refetch,
  } = useQuery({
    queryKey: ["InsuranceReport", searchData],
    queryFn: insuranceList,
    enabled: isSearchEnabled,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (searchData) {
      setIsSearchEnabled(true);
    }
  }, [searchData]);

  useEffect(() => {
    if (isSearchEnabled) {
      refetch();
    }
  }, [isSearchEnabled, refetch]);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Tabcomponent
          serverId={serverId}
          setSearchData={setSearchData}
          setIsSearchEnabled={setIsSearchEnabled}
          server={server}
          searchData={searchData}
          tripTypeCode={tripTypeCode}
          setTripTypeCode={setTripTypeCode}
        />
      </div>
      <div className={styles.bottom}>
        <InsurancesGrid
          data={data}
          isFetching={isFetching}
          tripTypeCode={tripTypeCode}
          detailKey="rates"
        />
      </div>
    </div>
  );
}

export default InsurancesReport;
