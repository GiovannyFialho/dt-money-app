import axios from "axios";

import { AppError } from "@/shared/helpers/app-error";
import { addTokenToRequest } from "@/shared/helpers/axios.helper";

export const dtMoneyApi = axios.create({
  baseURL: "http://192.168.68.100:3001",
});

addTokenToRequest(dtMoneyApi);

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
