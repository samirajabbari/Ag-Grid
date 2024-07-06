import { format } from "date-fns";
const convertData = (data) => {
  const formattedStartDate = format(new Date(data), "yyyy-MM-dd");
  return formattedStartDate;
};
export default convertData;
