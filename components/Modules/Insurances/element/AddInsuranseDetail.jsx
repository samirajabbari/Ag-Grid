import PostAddIcon from "@mui/icons-material/PostAdd";
import { useState } from "react";

function AddInsuranseDetail({ params }) {
  const [isShowModal, setIsShowModal] = useState("false");
  const addDetailHandler = () => {
    console.log(params);
  };
  return (
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
        cursor:"pointer"

      }}
      onClick={addDetailHandler}
    >
      <PostAddIcon />
    </button>
  );
}

export default AddInsuranseDetail;
