import PostAddIcon from "@mui/icons-material/PostAdd";
import { useContext, useEffect, useState } from "react";
import {
  Modals,
  Autocomplete,
  Select,
  RedioButton,
  // PriceInput,
  Button,
  PriceInput,
} from "../../../shared";
import {
  Box,
  Divider,
  FormControl,
  FormLabel,
  IconButton,
  InputLabel,
  MenuItem,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import { serverContext } from "../../../../src/App";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewInsuranceRates } from "../../../../api/fetchData";
import toast from "react-hot-toast";

function AddInsuranseDetail({ params }) {
  const { control, handleSubmit, watch, setValue } = useForm();
  const watche = watch();
  const { server } = useContext(serverContext);
  const [selectedCompany, setSelectedCompany] = useState({});
  const [isShowModal, setIsShowModal] = useState(false);
  const [companyList, setCompanyList] = useState();
  const queryClient = useQueryClient();
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
      setCompanyList(foundServer.companies || []);
    } else {
      setCompanyList([]);
    }
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
    direction: "ltr !important",
  };
  const radioBoxStyle = {
    margin: "1rem 0px",
    fontFamily: "IranSans",
    fontWeight: 600,
    padding: "1rem",
    border: "1px solid #cdccca",
    borderRadius: "4px",
  };
  const { mutate } = useMutation({
    mutationFn: addNewInsuranceRates,
    onSuccess: () => {
      setIsShowModal(false);
      toast.success("با موفقیت اضافه شد");

      queryClient.invalidateQueries("InsuranceReport");
    },
    onError: (error) => {
      setIsShowModal(false);
      queryClient.invalidateQueries(queryKey);
      console.error("خطا در ورود:", error.message);
      toast.error("افزودن آیتم با مشکل مواجه شد");
    },
  });
  const onSubmit = (data) => {
    console.log("watch", watche);
    mutate({ ...watche, rateId: params.rowId, company: selectedCompany });
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
            onSubmit={handleSubmit(onSubmit)}
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
              name={"company"}
              control={control}
              defaultValue={selectedCompany.code}
              style={sxStyle}
              options={companyList}
              multiple={false}
              placeHolder={""}
              getOptionLabel={(option) => option?.name || ""}
              onChange={(e, newValue) => {
                console.log(newValue);
                setSelectedCompany({
                  code: newValue.code,
                  name: newValue.name,
                });
                // setValue("company", {
                //   code: newValue.code,
                //   name: newValue.name,
                // });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="شرکت‌ها"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
            <FormControl sx={radioBoxStyle} label="BodyInsurance">
              <InputLabel
                id="BodyInsurance"
                sx={{ fontFamily: "IranSans", color: "#1976d2" }}
              >
                بیمه بدنه:
              </InputLabel>
              <RadioGroup
                row
                aria-labelledby="BodyInsurance"
                name="BodyInsurance"
              >
                <RedioButton
                  value={true}
                  control={control}
                  label={"دارد"}
                  name="BodyInsurance-hasInsuranced"
                  style={{}}
                />
                <RedioButton
                  value={false}
                  label={"ندارد"}
                  control={control}
                  name="BodyInsurance-hasInsuranced"
                  style={{}}
                />
              </RadioGroup>
            </FormControl>
            <PriceInput
              disabled={false}
              name="price"
              placeholder=""
              control={control}
              label="نرخ"
              rules={{}}
              helperText=""
              style={inputStyle}
            />
            <Button
              variant="contained"
              color="primary"
              style={{ fontFamily: "IranSans", width: "100%" }}
              type="submit"
              title="افزودن"
            />
          </form>
        </Modals>
      )}
    </>
  );
}

export default AddInsuranseDetail;
