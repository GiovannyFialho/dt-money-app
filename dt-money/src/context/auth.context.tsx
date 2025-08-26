import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useContext, useState } from "react";

import * as authService from "@/shared/services/dt-money/auth.service";

import type { IUser } from "@/shared/interfaces/user-interface";

import type { LoginFormParams } from "@/screens/login/login-form";
import type { RegisterFormParams } from "@/screens/register/register-form";
import type { IAuthenticateResponse } from "@/shared/interfaces/https/authenticate-response";

type AuthContextType = {
  user: IUser | null;
  token: string | null;
  handleAuthenticate: (params: LoginFormParams) => Promise<void>;
  handleRegister: (params: RegisterFormParams) => Promise<void>;
  handleLogout: () => void;
  restoreUserSession: () => Promise<string | null>;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

type AuthContextProviderProps = {
  children: ReactNode;
};

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  async function handleAuthenticate(userData: LoginFormParams) {
    const { user, token } = await authService.authenticate(userData);

    setUser(user);
    setToken(token);

    await AsyncStorage.setItem(
      "dt-money-user",
      JSON.stringify({ user, token }),
    );
  }

  async function handleRegister(formData: RegisterFormParams) {
    const { user, token } = await authService.registerUser(formData);

    setUser(user);
    setToken(token);

    await AsyncStorage.setItem(
      "dt-money-user",
      JSON.stringify({ user, token }),
    );
  }

  function handleLogout() {}

  async function restoreUserSession() {
    const userData = await AsyncStorage.getItem("dt-money-user");

    if (userData) {
      const { user, token } = JSON.parse(userData) as IAuthenticateResponse;

      setUser(user);
      setToken(token);
    }

    return userData;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        handleAuthenticate,
        handleRegister,
        handleLogout,
        restoreUserSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  return context;
}
