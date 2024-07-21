import React from "react";
import Header from "./Header";
import { Box } from "@mui/material";

function Layout({ children }) {
  return (
    <>
      <Header />
      <Box>{children}</Box>
    </>
  );
}

export default Layout;
