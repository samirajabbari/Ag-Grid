import { Divider, Stack } from "@mui/material";
import React from "react";

function ModalFooter({ chilren }) {
  return (
    <>
      <Divider sx={{ mt: 2 }} />

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {chilren}
      </Stack>
    </>
  );
}

export default ModalFooter;
