import React, { useContext, useEffect, useState } from "react";
import { serverContext } from "../../../src/App";
import { Grid } from "@mui/material";
import Tabcomponent from "./Template/Tabcomponent";
import InsurancesGrid from "./Template/InsurancesGrid";

function InsurancesReport() {
  const { server } = useContext(serverContext);
  const [serverId, setServerId] = useState();
  useEffect(() => {
    if (server) {
      setServerId(server);
    }
  }, []);
  return (
    <>
      <Tabcomponent serverId={serverId} />
      <InsurancesGrid />
    </>
  );
}

export default InsurancesReport;
