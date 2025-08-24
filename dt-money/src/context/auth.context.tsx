import { createContext, ReactNode, useContext, useState } from "react";

import type { LoginFormParams } from "@/screens/login/login-form";
import type { RegisterFormParams } from "@/screens/register/register-form";

type AuthContextType = {
  user: null;
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
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  async function handleAuthenticate({ email, password }: LoginFormParams) {}

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
