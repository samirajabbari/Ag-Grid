import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  const backHandler = () => {
    const mainToken = sessionStorage.getItem("mainToken");
    console.log(mainToken);
    if (mainToken) {
      navigate("/main");
    } else {
      navigate("/login");
    }
  };
  return (
    <div>
      <h1>Page is not Found</h1>
      <h4>came back</h4>
      <Button onClick={backHandler}>Back</Button>
    </div>
  );
}

export default NotFound;
