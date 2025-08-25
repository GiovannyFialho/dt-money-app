import { IUser } from "@/shared/interfaces/user-interface";

export interface IAuthenticateResponse {
  user: IUser;
  token: string;
}
