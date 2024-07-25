import React from "react";
import convertMiladiToShamsi from "../../../../utiles/MiladitoPersian";
import AddInsuranseDetail from "../element/AddInsuranseDetail";
import DeleteIsuranceDetail from "../element/DeleteIsuranceDetail";
import { deleteDetailInsurance } from "../../../../api/fetchData";

const extractVehicleType = (title) => {
  const vehicleTypes = ["اتوبوس", "مینی بوس", "سواری"];
  for (const type of vehicleTypes) {
    if (title?.includes(type)) {
      return type;
    }
  }
  return title;
};

export const insuranceDef = [
  {
    headerName: "نوع ماشین",
    rowGroup: true,
    hide: true,
    filter: "agSetColumnFilter",
    cellRenderer: "agGroupCellRenderer",
    valueGetter: ({ data }) => extractVehicleType(data?.description),
  },

  {
    headerName: "شماره",
    field: "id",
    filter: "agNumberColumnFilter",
  },
  {
    headerName: "حداکثر ظرفیت به نفر",
    field: "policy.maxCapacity",
    filter: "agNumberColumnFilter",
  },
  {
    headerName: "حداکثر مسافت به کیلومتر",
    field: "policy.maxDistance",
    filter: "agNumberColumnFilter",
  },
  {
    headerName: "توضیحات",
    field: "description",
    filter: "agTextColumnFilter",
  },
  {
    headerName: "عملیات",
    field: "",

    cellRenderer: function (params) {
      if (params.node.group) {
        return null;
      } else {
        return React.createElement(AddInsuranseDetail, { params: params.data });
      }
    },
  },
];

export const insuranceDetailDef = [
  {
    headerName: "نام و کد شرکت",
    field: "company.name",

    filter: "agSetColumnFilter",
    valueGetter: ({ data }) => {
      if (data?.company?.name) {
        return data.company.name;
      } else {
        return "همه";
      }
    },
  },
  
  {
    headerName: "بیمه بدنه",
    field: "bodyInsurance_hasInssured",
    filter: "agSetColumnFilter",
    valueGetter: ({ data }) => {
      return data?.bodyInsurance_hasInssured ? "دارد" : "ندارد";
    },
    cellStyle: (params) => {
      if (params.value === "دارد") {
        return { color: "green", fontWeight: "600" };
      }
      return { color: "red", fontWeight: "600" };
    },
  },
  {
    headerName: "نرخ",
    field: "price",
    filter: "agNumberColumnFilter",
    valueFormatter: (params) => {
      return `${params?.value?.toLocaleString("fa-IR")} ریال`;
    },
  },
  {
    headerName: "تاریخ و ساعت اعمال",
    field: "effectiveDateTime",
    filter: "agTextColumnFilter",
    valueFormatter: (param) => {
      const shamsiData = convertMiladiToShamsi(param.value, "D");
      return shamsiData;
    },
  },
  {
    headerName: "عملیات",
    field: "",
    cellRenderer: function (params) {
      return React.createElement(DeleteIsuranceDetail, { params: params.data });
    },
  },
];
export const charter_abroadDef = [
  {
    headerName: "شماره",
    field: "id",
    filter: "agNumberColumnFilter",
  },
  {
    headerName: "نوع ماشین",
    rowGroup: true,
    hide: true,
    filter: "agSetColumnFilter",
    cellRenderer: "agGroupCellRenderer",
    valueGetter: ({ data }) => extractVehicleType(data?.description),
  },

  {
    headerName: "توضیحات",
    field: "description",
    filter: "agTextColumnFilter",
  },
  {
    headerName: "عملیات",
    field: "",

    cellRenderer: function (params) {
      if (params.node.group) {
        return null;
      } else {
        return React.createElement(AddInsuranseDetail, { params: params.data });
      }
    },
  },
];
export const CharterDetailDef = [
  {
    headerName: "نام و کد شرکت",
    field: "company.name",

    filter: "agSetColumnFilter",
    valueGetter: ({ data }) => {
      if (data?.company?.name) {
        return data.company.name;
      } else {
        return "همه";
      }
    },
  },
  {
    headerName: "بیمه بدنه",
    field: "bodyInsurance_hasInssured",
    filter: "agSetColumnFilter",
    valueGetter: ({ data }) => {
      return data?.bodyInsurance_hasInssured ? "دارد" : "ندارد";
    },
    cellStyle: (params) => {
      if (params.value === "دارد") {
        return { color: "green", fontWeight: "600" };
      }
      return { color: "red", fontWeight: "600" };
    },
  },
  {
    headerName: "نرخ روزانه",
    field: "price",
    filter: "agNumberColumnFilter",
    valueFormatter: (params) => {
      return `${params?.value?.toLocaleString("fa-IR")} ریال`;
    },
  },
  {
    headerName: "تاریخ و ساعت اعمال",
    field: "effectiveDateTime",
    filter: "agTextColumnFilter",
    valueFormatter: (param) => {
      const shamsiData = convertMiladiToShamsi(param.value, "D");
      return shamsiData;
    },
  },
  {
    headerName: "عملیات",
    field: "",
    cellRenderer: function (params) {
      return React.createElement(DeleteIsuranceDetail, { params: params.data });
    },
  },
];
export const abroadDetailDef = [
  {
    headerName: "نام و کد شرکت",
    field: "company.name",

    filter: "agSetColumnFilter",
    valueGetter: ({ data }) => {
      if (data?.company?.name) {
        return data.company.name;
      } else {
        return "همه";
      }
    },
  },
  {
    headerName: "بیمه بدنه",
    field: "bodyInsurance_hasInssured",
    filter: "agSetColumnFilter",
    valueGetter: ({ data }) => {
      return data?.bodyInsurance_hasInssured ? "دارد" : "ندارد";
    },
    cellStyle: (params) => {
      if (params.value === "دارد") {
        return { color: "green", fontWeight: "600" };
      }
      return { color: "red", fontWeight: "600" };
    },
  },
  {
    headerName: "نرخ تا یک هفته",
    field: "price",
    filter: "agNumberColumnFilter",
    valueFormatter: (params) => {
      return `${params?.value?.toLocaleString("fa-IR")} ریال`;
    },
  },
  {
    headerName: "تاریخ و ساعت اعمال",
    field: "effectiveDateTime",
    filter: "agTextColumnFilter",
    valueFormatter: (param) => {
      const shamsiData = convertMiladiToShamsi(param.value, "D");
      return shamsiData;
    },
  },
  {
    headerName: "عملیات",
    field: "",
    cellRenderer: function (params) {
      return React.createElement(DeleteIsuranceDetail, { params: params.data });
    },
  },
];
