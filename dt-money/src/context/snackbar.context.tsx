import { createContext, ReactNode, useState } from "react";

type SnackbarMessageType = "ERROR" | "SUCCESS";

type NotifyMessageParams = {
  message: string | null;
  type: SnackbarMessageType;
};

export type SnackbarContextType = {
  message: string | null;
  type: SnackbarMessageType | null;
  notify: (params: NotifyMessageParams) => void;
};

const SnackbarContext = createContext({} as SnackbarContextType);

type SnackbarContextProviderProps = {
  children: ReactNode;
};

export function SnackbarContextProvider({
  children,
}: SnackbarContextProviderProps) {
  const [message, setMessage] = useState<string | null>(null);
  const [type, setType] = useState<SnackbarMessageType | null>(null);

  function notify({ message, type }: NotifyMessageParams) {
    setMessage(message);
    setType(type);

    setTimeout(() => {
      setMessage(null);
      setType(null);
    }, 3000); // 3s
  }

  return (
    <SnackbarContext.Provider value={{ message, type, notify }}>
      {children}
    </SnackbarContext.Provider>
  );
}
