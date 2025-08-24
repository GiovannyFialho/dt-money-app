import axios from "axios";

export const dtMoneyApi = axios.create({
  baseURL: "http://localhost:3001",
});
