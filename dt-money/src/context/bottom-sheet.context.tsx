import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

import { colors } from "@/shared/colors";
import { TouchableWithoutFeedback, View } from "react-native";

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
  const [index, setIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = ["70%", "90%"];

  const openBottomSheet = useCallback(
    (newContent: React.ReactNode, index: number) => {
      setIndex(index);
      setIsOpen(true);
      setContent(newContent);
      requestAnimationFrame(() => {
        bottomSheetRef.current?.snapToIndex(index);
      });
    },
    [],
  );

  const closeBottomSheet = useCallback(() => {
    setIsOpen(false);
    setContent(null);
    setIndex(-1);
    bottomSheetRef.current?.close();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      setIsOpen(false);
    }
  }, []);

  return (
    <BottomSheetContext.Provider value={{ openBottomSheet, closeBottomSheet }}>
      {children}

      {isOpen && (
        <TouchableWithoutFeedback onPress={closeBottomSheet}>
          <View className="z-1 absolute inset-0 bg-black/70" />
        </TouchableWithoutFeedback>
      )}

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        style={{ zIndex: 2 }}
        index={index}
        enablePanDownToClose
        onChange={handleSheetChanges}
        backgroundStyle={{
          backgroundColor: colors["background-secondary"],
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          elevation: 9,
        }}
      >
        <BottomSheetScrollView>{content}</BottomSheetScrollView>
      </BottomSheet>
    </BottomSheetContext.Provider>
  );
}

export function useBottomSheetContext() {
  return useContext(BottomSheetContext);
}
