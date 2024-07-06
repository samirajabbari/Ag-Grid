import convertMiladiToShamsi from "../utiles/MiladitoPersian";
export const saleResourceRenderer = (params) => {
  if (params?.data?.saleResource === "internal") {
    return "داخلی";
  }
  return params?.data?.saleResource;
};
export const dateTimeRenderer = (param) => {
  const shamsiData = convertMiladiToShamsi(param.value, "D");
  return shamsiData;
};
const columnDefs = [
  {
    headerName: "نام شرکت",
    field: "service.company.name",
    filter: "agSetColumnFilter",
  },
  {
    headerName: "شماره سرویس",
    field: "service.id",
    filter: "agTextColumnFilter",
  },
  {
    headerName: "مبدا سرویس",
    field: "service.boardingPoint.city.name",
  },
  {
    headerName: "مقصد نهایی سرویس",
    field: "service.finalDestination.city.name",
  },
  {
    headerName: "شناسه بلیط",
    field: "id",
    filter: "agNumberColumnFilter",
  },
  {
    headerName: "شماره داخلی",
    field: "internalNumber",
    filter: "agTextColumnFilter",
  },
  {
    headerName: "شماره آنلاین",
    field: "onlineNumber",
    filter: "agTextColumnFilter",
  },
  {
    headerName: "وضعیت",
    field: "statusDescription",
  },
  {
    headerName: "متد فروش",
    field: "saleResource",
    valueFormatter: saleResourceRenderer,
  },
  {
    headerName: "مبدا",
    field: "trip.boardingPoint.station.name",
  },
  {
    headerName: "مقصد",
    field: "trip.droppingPoint.city.name",
  },
  {
    headerName: "تاریخ و ساعت حرکت",
    // field: "departureDateTime",
    filter: "agTextColumnFilter",
    valueGetter: (param) => {
      if (param.data.departureDateTime)
        return convertMiladiToShamsi(param.data.departureDateTime, "D");
    },
  },
  {
    headerName: "تعداد مسافر",
    field: "seatCounts",
    filter: "agNumberColumnFilter",
  },
  {
    headerName: "قیمت واحد",
    field: "pricePerOne",
    filter: "agNumberColumnFilter",
    valueFormatter: (params) => {
      if (params?.value === undefined) return "";
      return `${params?.value?.toLocaleString("fa-IR")} ریال`;
    },
    filterParams: {
      valueFormatter: (params) => params.pricePerOne.toLocaleString("fa-IR"),
    },
  },

  {
    headerName: "قیمت کل",
    filter: "agTextColumnFilter",
    field: "AllPrice",
    valueFormatter: (params) =>
      `${params?.value?.toLocaleString("fa-IR")} ریال`,
  },
  {
    headerName: "کل کارمزد داخلی",
    field: "totalInternalWage",
    valueFormatter: (params) => {
      if (!params.value) return "-";

      return `${params?.value?.toLocaleString("fa-IR")} ریال`;
    },
  },
  {
    headerName: "کامزد انلاین",
    field: "",
    valueFormatter: (params) => {
      if (!params.value) return "-";

      return `${params?.value?.toLocaleString("fa-IR")} ریال`;
    },
  },
  {
    headerName: "کارمز پوز",
    field: "totalpcPosWageAmount",
    valueFormatter: (params) => {
      if (!params.value) return "-";

      return `${params?.value?.toLocaleString("fa-IR")} ریال`;
    },
  },
  {
    headerName: "نام مسافر",
    field: "contact.fullName",
  },
  {
    headerName: "کد ملی",
    field: "contact.nationalCode",
  },
  {
    headerName: "شماره موبایل",
    field: "contact.mobileNumber",
  },
  {
    headerName: "جنسیت",
    valueGetter: ({ data }) => {
      if (data?.contact?.gender === undefined) {
        return "";
      }
      return data?.contact?.gender === "male" ? "مرد" : "زن";
    },
  },
  {
    headerName: "کاربر صادر کننده",
    field: "issuer.userName",
  },
  {
    headerName: "تاریخ و ساعت صدور",
    field: "issuer.dateTime",
    filter: "agTextColumnFilter",
    valueGetter: (params) => {
      if (!params?.data?.issuer?.dateTime) {
        return "";
      }
      return convertMiladiToShamsi(params?.data?.issuer?.dateTime, "DT");
    },
  },
  {
    headerName: "صندوقدار",
    field: "cashier.userName",
  },
  {
    headerName: "نحوه پرداخت",
    field: "cashier.paymentMethode",
    valueFormatter: ({ data }) =>
      data?.cashier?.paymentMethode === "cash"
        ? "نقدی"
        : data?.cashier?.paymentMethode,
  },
  {
    headerName: "افزوده شده در پایش",
    field: "isAddedOnGateway",
    valueGetter: ({ data }) => {
      if (data.isAddedOnGateway === undefined) return "";
      return data.isAddedOnGateway ? "بله" : "خیر";
    },
  },
  {
    headerName: "کاربر اضافه کننده به صورت",
    field: "addedOnStatment.userName",
  },
  {
    headerName: "تاریخ و ساعت افزوده شده به صورت",
    filter: "agTextColumnFilter",
    field: "addedOnStatment.jalaliDateTime",
  },
  {
    headerName: "اطلاعات استرداد ",
    children: [
      {
        headerName: "استرداد کننده",
        field: "refundedTicket.refunder.userName",
        columnGroupShow: "close",
      },
      {
        headerName: "صندوقدار",
        field: "refundedTicket.cashier.userName",
        columnGroupShow: "close",
      },
      {
        headerName: "تاریخ و ساعت استرداد",
        filter: "agTextColumnFilter",
        field: "refundedTicket.dateTime",
        valueFormatter: ({ data }) => {
          if (data?.refundedTicket?.dateTime === undefined) return "";
          return convertMiladiToShamsi(data?.refundedTicket?.dateTime, "DT");
        },
        columnGroupShow: "close",
      },

      {
        headerName: "مبلغ جریمه",
        field: "refundedTicket.refundPenaltyAmount",
        filter: "agNumberColumnFilter",
        valueFormatter: ({ data }) => {
          if (data?.refundedTicket?.refundPenaltyAmount) {
            return `${data?.refundedTicket?.refundPenaltyAmount.toLocaleString(
              "fa-IR"
            )}ریال `;
          } else {
            return "-";
          }
        },
        columnGroupShow: "open",
      },
      {
        headerName: "درصد جریمه",
        field: "refundedTicket.refundPenaltyPercent",
        filter: "agNumberColumnFilter",
        columnGroupShow: "open",
      },
      {
        headerName: "ضریب استرداد",
        field: "refundedTicket.refundCoefficientAmount",
        filter: "agNumberColumnFilter",
        valueFormatter: ({ data }) => {
          if (data?.refundedTicket?.refundCoefficientAmount) {
            return `${data?.refundedTicket?.refundCoefficientAmount.toLocaleString(
              "fa-IR"
            )}ریال `;
          } else {
            return "-";
          }
        },
        columnGroupShow: "open",
      },
      {
        headerName: "مبلغ قابل استرداد",
        field: "refundedTicket.totalAmount",
        filter: "agNumberColumnFilter",
        valueFormatter: ({ data }) => {
          if (data?.refundedTicket?.totalAmount) {
            return `${data?.refundedTicket?.totalAmount.toLocaleString(
              "fa-IR"
            )}ریال `;
          } else {
            return "-";
          }
        },
        columnGroupShow: "open",
      },
      {
        headerName: "توضیحات",
        field: "refundedTicket.comment",
        columnGroupShow: "open",
      },
    ],
  },
];
export default columnDefs;
