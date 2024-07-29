import PostAddIcon from "@mui/icons-material/PostAdd";
import { useContext, useEffect, useState } from "react";
import {
  Modals,
  Autocomplete,
  Select,
  RedioButton,
  InputText,
  Button,
} from "../../../shared";
import {
  Box,
  Divider,
  FormControl,
  FormLabel,
  IconButton,
  MenuItem,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm, FormProvider } from "react-hook-form";
import { serverContext } from "../../../../src/App";

function AddInsuranseDetail({ params }) {
  const methods = useForm();
  const { handleSubmit, setValue, control } = useForm();
  const { server } = useContext(serverContext);
  const [isShowModal, setIsShowModal] = useState(false);
  const [companyList, setCompanyList] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");

  const addDetailHandler = () => {
    setIsShowModal(true);
  };

  useEffect(() => {
    if (isShowModal) {
      companies();
    }
  }, [isShowModal]);

  const companies = () => {
    const foundServer = server.find((item) => item.id === params?.serverId);
    if (foundServer) {
      setCompanyList(foundServer.companies);
    }
  };
  const priceFormat = (e) => {
    const valueFormat = e.target.value.toLocaleString("fa-IR");
    return valueFormat;
  };
  const sxStyle = {
    marginTop: "1rem",
    fontFamily: "IranSans",
    fontWeight: 200,
  };
  const inputStyle = {
    marginBottom: "1rem",
    fontFamily: "IranSans",
    fontSize: "1rem",
  };
  const radioBoxStyle = {
    margin: "1rem 0px",
    fontFamily: "IranSans",
    fontWeight: 200,
  };
  const onSubmit = (data) => {
    console.log("module data", data);
  };
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
        onClick={addDetailHandler}
      >
        <PostAddIcon />
      </button>
      {isShowModal && (
        <Modals>
          <Modals.Header>
            <Box>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                pb={1}
              >
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h6"
                  sx={{ fontFamily: "IranSans", color: "#009eff" }}
                >
                  افزودن نرخ جدید
                </Typography>

                <IconButton onClick={() => setIsShowModal(false)}>
                  <CloseIcon sx={{ color: "#9b2334" }} />
                </IconButton>
              </Stack>
              <Divider sx={{ mb: 2, backgroundColor: "#1976d2" }} />
            </Box>
          </Modals.Header>
          <form
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Select
              label={"سرور"}
              name={"serverId"}
              control={control}
              defaultValue={params?.serverId}
              controlStyle={{ mt: 5 }}
              style={sxStyle}
            >
              {server
                .filter((serverItem) => serverItem.id === params.serverId)
                .map((filteredServerItem) => (
                  <MenuItem
                    key={filteredServerItem.id}
                    value={filteredServerItem.id}
                    sx={sxStyle}
                  >
                    {filteredServerItem.description}
                  </MenuItem>
                ))}
            </Select>

            <Autocomplete
              label={"شرکت‌ها"}
              name={"componies"}
              control={control}
              defaultValue={""}
              style={sxStyle}
              options={companyList}
              getOptionLabel={(option) => option?.name}
              onChange={(e, newValue) =>
                setSelectedCompany((prev) => ({
                  ...prev,
                  companies: newValue.map((item) => item.code),
                }))
              }
            />
            <FormControl sx={radioBoxStyle}>
              <FormLabel id="BodyInsurance" sx={{ fontFamily: "IranSans" }}>
                بیمه بدنه:
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="BodyInsurance"
                name="row-radio-buttons-group"
              >
                <RedioButton
                  value={"true"}
                  control={control}
                  label={"دارد"}
                  name="hasBodyInsurance"
                  style={{}}
                />
                <RedioButton
                  value={"false"}
                  label={"ندارد"}
                  control={control}
                  name="noBodyInsurance"
                  style={{}}
                />
              </RadioGroup>
            </FormControl>
            <InputText
              disabled={false}
              name="price"
              placeholder="نرخ"
              control={control}
              label="نرخ"
              rules={{ required: "این فیلد الزامی است" }}
              helperText="وارد کردن نرخ جدید الزامی است"
              style={inputStyle}
              onChange={(e) => priceFormat(e)}
            />
          </form>
          <Button
            variant="contained"
            color="primary"
            sx={{ fontFamily: "IranSans", width: "100%" }}
            type="submit"
            onClick={onSubmit}
          >
            ثبت
          </Button>
        </Modals>
      )}
    </>
  );
}

export default AddInsuranseDetail;
