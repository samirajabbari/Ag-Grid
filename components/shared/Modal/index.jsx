import React from "react";
import ReactDOM from "react-dom";
import ModalHeader from "./ModalHeader";
import ModalFooter from "./ModalFooter";
import { Box } from "@mui/material";

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
  zIndex: "10001", // Ensure it's above other content
};

const modalStyle = {
  position: "fixed", // Changed from "absolute" to "fixed" to cover full screen
  top: 0,
  left: 0,
  zIndex: "10000", // Ensure it's below the body style
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(132, 179, 211, 0.5)", // Adjust transparency
  backdropFilter: "blur(15px)",
};

function Modals({ children }) {
  return ReactDOM.createPortal(
    <Box sx={modalStyle}>
      <Box sx={bodyStyle}>{children}</Box>
    </Box>,
    document.getElementById("modal-root") // Ensure this matches the ID in index.html
  );
}

Modals.Header = ModalHeader;
Modals.Footer = ModalFooter;

export { Modals };
