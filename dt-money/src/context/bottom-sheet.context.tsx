import { createContext, ReactNode, useCallback, useState } from "react";

type BottomSheetContextType = {
  openBottomSheet: (content: ReactNode, index: number) => void;
  closeBottomSheet: () => void;
};

export const BottomSheetContext = createContext<BottomSheetContextType>(
  {} as BottomSheetContextType,
);

type BottomSheetContextProviderProps = {
  children: ReactNode;
};

export function BottomSheetContextProvider({
  children,
}: BottomSheetContextProviderProps) {
  const [content, setContent] = useState<ReactNode | null>(null);

  const openBottomSheet = useCallback(
    (newContent: ReactNode, index: number) => {
      setContent(newContent);
    },
    [],
  );

  const closeBottomSheet = useCallback(() => {
    setContent(null);
  }, []);

  return (
    <BottomSheetContext.Provider value={{ openBottomSheet, closeBottomSheet }}>
      {children}
    </BottomSheetContext.Provider>
  );
}
