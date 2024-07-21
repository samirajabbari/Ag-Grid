import React from "react";
import ModalHeader from "./ModalHeader";
import ModalFooter from "./ModalFooter";
import { Box, Container } from "@mui/material";

const bodyStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
  zIndex: "100",
};

const modalStyle = {
  position: "fixed",
  top: "0px",
  buttom: "0px",
  zIndex: "10001",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(132 179 211 / 50%)",
  backdropFilter: "blur(15px)",
};

function Modals({ children }) {
  return (
    <Box sx={modalStyle}>
      <Box sx={bodyStyle}>{children}</Box>
    </Box>
  );
}

Modals.Header = ModalHeader;
Modals.Footer = ModalFooter;

export { Modals };
