import convertMiladiToShamsi from "./MiladitoPersian";

function getDateFilterParams() {
  return {
    comparator: function (filterLocalDateAtMidnight, cellValue) {
      // تبدیل تاریخ سلول به تاریخ شمسی
      const cellDate = convertMiladiToShamsi(cellValue, "D");
      // تبدیل تاریخ فیلتر به تاریخ شمسی
      const filterDate = convertMiladiToShamsi(filterLocalDateAtMidnight, "D");
      if (cellDate === filterDate) {
        return 0;
      }
      if (cellDate < filterDate) {
        return -1;
      }
      if (cellDate > filterDate) {
        return 1;
      }
    },
    browserDatePicker: true, // استفاده از تقویم مرورگر
    localeTextFunc: function (key) {
      // متن‌های فارسی برای تقویم
      if (key === "loadingOoo") {
        return "در حال بارگذاری...";
      }
      return key;
    },
  };
}
export default getDateFilterParams;
