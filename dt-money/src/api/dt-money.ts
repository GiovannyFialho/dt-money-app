import axios from "axios";

import { AppError } from "@/shared/helpers/app-error";

export const dtMoneyApi = axios.create({
  baseURL: "http://192.168.68.106:3001",
});

dtMoneyApi.interceptors.response.use(
  (config) => config,
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message));
    } else {
      return Promise.reject(new AppError("Falha na requisição"));
    }
  },
);
