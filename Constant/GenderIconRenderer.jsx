import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import Person2Icon from "@mui/icons-material/Person2";

function GenderIconRenderer(params) {
  return params.value === "مرد" ? (
    <div style={{ display: "flex", alignItems: "center" }}>
      {params.value && <PersonIcon sx={{ color: "#71bdff" }} />}{" "}
      <span>{params.value}</span>
    </div>
  ) : (
    <div style={{ display: "flex", alignItems: "center" }}>
      {params.value && <Person2Icon sx={{ color: "#ff71af" }} />}
      <span>{params.value}</span>
    </div>
  );
}

export default GenderIconRenderer;
