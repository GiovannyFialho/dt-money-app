import axios from "axios";

export const dtMoneyApi = axios.create({
  baseURL: "http://192.168.68.101:3001",
});
