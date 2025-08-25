import { dtMoneyApi } from "@/api/dt-money";

import type { IAuthenticateResponse } from "@/shared/interfaces/https/authenticate-response";

import { LoginFormParams } from "@/screens/login/login-form";

export async function authenticate(
  userDate: LoginFormParams,
): Promise<IAuthenticateResponse> {
  const { data } = await dtMoneyApi.post<IAuthenticateResponse>(
    "/auth/login",
    userDate,
  );

  return data;
}
