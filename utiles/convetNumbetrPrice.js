export const converttoNumber = (number) => {
  // حذف کاماها
  const valueWithoutCommas = number.replace(/,/g, "");
  // تبدیل به عدد
  const numericValue = parseFloat(valueWithoutCommas);
  return numericValue;
};
