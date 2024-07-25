import React, { useContext, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Box, Typography } from "@mui/material";
import { Modals, Button } from "../../../shared";
import { useMutation } from "@tanstack/react-query";
import { deleteDetailInsurance } from "../../../../api/fetchData";
import toast from "react-hot-toast";

function DeleteIsuranceDetail({ params }) {
  const deleteHandler = () => {};
  const [isShowModal, setIsShowModal] = useState(false);
  // const context = useContext(params.api.gridOptionsWrapper.gridOptions.context);

  const deletDetailHandler = () => {
    setIsShowModal(true);
    console.log(params);
    console.log(context);
    // mutate()
  };
  const { mutate } = useMutation({
    mutationFn: deleteDetailInsurance,
    onSuccess: () => {
      toast.success("با موفقیت حذف شد");
    },
    onError: (error) => {
      console.error("خطا در ورود:", error.message);
      toast.error("حذف آیتم با مشکل مواجه شد");
    },
  });
  return (
    <>
      <button
        style={{
          border: "none",
          outline: "none",
          backgroundColor: "transparent",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          cursor: "pointer",
        }}
        onClick={deletDetailHandler}
      >
        <DeleteForeverIcon sx={{ color: "#ff6687 " }} />
      </button>
      {isShowModal && (
        <Modals>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h6"
              component="h2"
              sx={{ fontFamily: "IranSans" }}
            >
              آیا مطمئن هستید که می‌خواهید این اطلاعات را حذف کنید؟
            </Typography>
            <Box
              sx={{
                mt: 2,
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Button
                style={{ fontFamily: "IranSans" }}
                variant="contained"
                color="primary"
                onClick={() => deleteHandler}
                title="بله"
                type="primary"
              />
              <Button
                style={{ fontFamily: "IranSans" }}
                variant="outlined"
                color="error"
                onClick={() => setIsShowModal(false)}
                title="لغو"
                type="primary"
              />
            </Box>
          </Box>
        </Modals>
      )}
    </>
  );
}

export default DeleteIsuranceDetail;
