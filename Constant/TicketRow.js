import convertMiladiToShamsi from "../utiles/MiladitoPersian";

import GenderIconRenderer from "./GenderIconRenderer";
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
    filterParams: {
      tabs: ["filter"],
    },
  },
  {
    headerName: "شماره سرویس",
    field: "service.id",
    filter: "agTextColumnFilter",
  },
  {
    headerName: "مبدا سرویس",
    field: "service.boardingPoint.city.name",
    filter: "agTextColumnFilter",
  },
  {
    headerName: "مقصد نهایی سرویس",
    field: "service.finalDestination.city.name",
    filter: "agTextColumnFilter",
  },
  {
    headerName: "شناسه بلیط",
    field: "id",
    filter: "agTextColumnFilter",
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
    valueGetter: saleResourceRenderer,
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
        return convertMiladiToShamsi(param.data.departureDateTime, "DT");
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
    filter: "agNumberColumnFilter",
    field: "AllPrice",
    valueFormatter: (params) =>
      `${params?.value?.toLocaleString("fa-IR")} ریال`,
  },
  {
    headerName: "کل کارمزد داخلی",
    filter: "agNumberColumnFilter",
    field: "totalInternalWage",
    valueFormatter: (params) => {
      if (!params.value) return "-";

      return `${params?.value?.toLocaleString("fa-IR")} ریال`;
    },
  },
  {
    headerName: "کامزد انلاین",
    filter: "agNumberColumnFilter",
    field: "",
    valueFormatter: (params) => {
      if (!params.value) return "-";

      return `${params?.value?.toLocaleString("fa-IR")} ریال`;
    },
  },
  {
    headerName: "کارمز پوز",
    field: "totalpcPosWageAmount",
    filter: "agNumberColumnFilter",

    valueFormatter: (params) => {
      if (!params.value) return "-";

      return `${params?.value?.toLocaleString("fa-IR")} ریال`;
    },
  },
  {
    headerName: "نام مسافر",
    field: "contact.fullName",
    filter: "agTextColumnFilter",
  },
  {
    headerName: "کد ملی",
    field: "contact.nationalCode",
    filter: "agTextColumnFilter",
  },
  {
    headerName: "شماره موبایل",
    field: "contact.mobileNumber",
    filter: "agTextColumnFilter",
  },
  {
    headerName: "جنسیت",
    valueGetter: ({ data }) => {
      if (data?.contact?.gender === undefined) {
        return "";
      }
      return data?.contact?.gender === "male" ? "مرد" : "زن";
    },
    cellRenderer: GenderIconRenderer,
  },
  {
    headerName: "کاربر صادر کننده",
    field: "issuer.userName",
    filter: "agTextColumnFilter",
  },
  {
    headerName: "تاریخ صدور",
    field: "issuer.dateTime",
    filter: "agTextColumnFilter",
    valueGetter: (params) => {
      if (!params?.data?.issuer?.dateTime) {
        return "";
      }
      return convertMiladiToShamsi(params?.data?.issuer?.dateTime, "D");
    },
  },
  {
    headerName: "ساعت صدور",
    field: "issuer.dateTime",
    filter: "agTextColumnFilter",
    valueGetter: (params) => {
      if (!params?.data?.issuer?.dateTime) {
        return "";
      }
      return convertMiladiToShamsi(params?.data?.issuer?.dateTime, "T");
    },
  },
  {
    headerName: "صندوقدار",
    field: "cashier.userName",
    filter: "agTextColumnFilter",
  },
  {
    headerName: "نحوه پرداخت",
    field: "cashier.paymentMethode",
    valueGetter: ({ data }) => {
      if (data?.cashier?.paymentMethode === undefined) return "";
      return data?.cashier.paymentMethode === "cash" ? "نقدی" : "پوز";
    },
  },
  {
    headerName: "افزوده شده در پایش",
    field: "isAddedOnGateway",
    valueGetter: ({ data }) => {
      if (data.isAddedOnGateway === undefined) return "";
      return data.isAddedOnGateway ? "بله" : "خیر";
    },
    cellStyle: (params) => {
      if (params.value === "خیر") {
        return { color: "red" };
      }
      return { color: "green" };
    },
  },
  {
    headerName: "کاربر اضافه کننده به صورت",
    field: "addedOnStatment.userName",
    filter: "agTextColumnFilter",
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
        columnGroupShow: "open",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "صندوقدار",
        field: "refundedTicket.cashier.userName",
        filter: "agTextColumnFilter",
        columnGroupShow: "open",
      },
      {
        headerName: "تاریخ و ساعت استرداد",
        filter: "agTextColumnFilter",
        field: "refundedTicket.dateTime",
        valueFormatter: ({ data }) => {
          if (data?.refundedTicket?.dateTime === undefined) return "";
          return convertMiladiToShamsi(data?.refundedTicket?.dateTime, "DT");
        },
        columnGroupShow: "open",
      },

      {
        headerName: "مبلغ جریمه",
        field: "refundedTicket.refundPenaltyAmount",
        filter: "agNumberColumnFilter",
        columnGroupShow: "close",
        valueFormatter: ({ data }) => {
          if (data?.refundedTicket?.refundPenaltyAmount) {
            return `${data?.refundedTicket?.refundPenaltyAmount.toLocaleString(
              "fa-IR"
            )}ریال `;
          } else {
            return "-";
          }
        },
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
        columnGroupShow: "close",

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
      },
      {
        headerName: "توضیحات",
        field: "refundedTicket.comment",
        filter: "agTextColumnFilter",
        columnGroupShow: "open",
      },
    ],
  },
];
export default columnDefs;
