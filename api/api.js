import axios from "axios";
import { decodeToken } from "../utiles/DeCodeToken";

const Api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URI,
  headers: {
    "Content-Type": "application/json",
  },
});

Api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("mainToken");
    if (token) {
      // const decodedToken = decodeToken(token);
      // config.headers["X-User-Info"] = JSON.stringify(decodedToken);
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn("Token not found in sessionStorage");
    }
    return config;
  },
  (error) => {
    console.error("Error in request interceptor:", error);
    return Promise.reject(error);
  }
);

export default Api;
