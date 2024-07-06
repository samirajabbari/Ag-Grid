import moment from "jalali-moment";
const convertMiladiToShamsi = (date, format) => {
  //format: DT || D
  if (format === "D") {
    const shamsi = moment(date).locale("fa").format("jYYYY/jMM/jDD");
    return shamsi;
  }
  const shamsi = moment(date).locale("fa").format("HH:MM jYYYY/jMM/jDD");
  return shamsi;
};
export default convertMiladiToShamsi;
