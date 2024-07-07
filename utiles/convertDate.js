// import { format } from "date-fns";
// const convertData = (data) => {
//   const formattedStartDate = format(new Date(data), "yyyy-MM-dd");
//   return formattedStartDate;
// };
// export default convertData;
import moment from 'moment-jalaali';

const convertDate = (jalaliDate) => {
  // تنظیمات اولیه برای استفاده از تاریخ شمسی در moment
  moment.loadPersian({ dialect: 'persian-modern', useGregorianParser: true });

  // تبدیل تاریخ شمسی به میلادی و فرمت کردن آن
  const gregorianDate = moment(jalaliDate, 'jYYYY/jMM/jDD').format('YYYY/MM/DD');
  return gregorianDate;
};

export default convertDate;

