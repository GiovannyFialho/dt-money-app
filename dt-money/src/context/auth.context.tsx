import { createContext, ReactNode, useContext, useState } from "react";

import * as authService from "@/shared/services/dt-money/auth.service";

import type { IUser } from "@/shared/interfaces/user-interface";

import type { LoginFormParams } from "@/screens/login/login-form";
import type { RegisterFormParams } from "@/screens/register/register-form";

type AuthContextType = {
  user: IUser | null;
  token: string | null;
  handleAuthenticate: (params: LoginFormParams) => Promise<void>;
  handleRegister: (params: RegisterFormParams) => Promise<void>;
  handleLogout: () => void;
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
  }

  async function handleRegister(formData: RegisterFormParams) {}

  function handleLogout() {}

  return (
    <AuthContext.Provider
      value={{ user, token, handleAuthenticate, handleRegister, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  return context;
}
