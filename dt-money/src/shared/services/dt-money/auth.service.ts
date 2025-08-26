import { dtMoneyApi } from "@/api/dt-money";

import type { IAuthenticateResponse } from "@/shared/interfaces/https/authenticate-response";

import type { LoginFormParams } from "@/screens/login/login-form";
import type { RegisterFormParams } from "@/screens/register/register-form";

export async function authenticate(
  userDate: LoginFormParams,
): Promise<IAuthenticateResponse> {
  const { data } = await dtMoneyApi.post<IAuthenticateResponse>(
    "/auth/login",
    userDate,
  );

  return data;
}

export async function registerUser(
  userDate: RegisterFormParams,
): Promise<IAuthenticateResponse> {
  const { data } = await dtMoneyApi.post<IAuthenticateResponse>(
    "/auth/register",
    userDate,
  );

  return data;
}
