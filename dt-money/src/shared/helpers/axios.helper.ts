import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosInstance, type InternalAxiosRequestConfig } from "axios";

import type { IAuthenticateResponse } from "@/shared/interfaces/https/authenticate-response";

export function addTokenToRequest(axiosInstance: AxiosInstance) {
  axiosInstance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      const userData = await AsyncStorage.getItem("dt-money-user");

      if (userData) {
        const { token } = JSON.parse(userData) as IAuthenticateResponse;

        if (!config.headers) {
          config.headers = {} as InternalAxiosRequestConfig["headers"];
        }

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }

      return config;
    },
  );
}
