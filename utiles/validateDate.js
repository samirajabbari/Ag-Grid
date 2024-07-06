import { differenceInCalendarDays } from "date-fns";
import convertData from "./convertDate";

const validateDateRange = (startDate, endDate) => {
  if (startDate && endDate) {
    const diffInDays = differenceInCalendarDays(
      convertData(endDate),
      convertData(startDate)
    );
    if (diffInDays > 30) {
      return false;
    }
  }
  return true;
};
export default validateDateRange;
