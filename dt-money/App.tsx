import "@/styles/global.css";

import { NavigationRoutes } from "@/routes";

import { AuthContextProvider } from "@/context/auth.context";
import { BottomSheetContextProvider } from "@/context/bottom-sheet.context";
import { SnackbarContextProvider } from "@/context/snackbar.context";
import { TransactionContextProvider } from "@/context/transaction.context";

import { Snackbar } from "@/components/snackbar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView className="flex-1">
      <SnackbarContextProvider>
        <AuthContextProvider>
          <TransactionContextProvider>
            <BottomSheetContextProvider>
              <NavigationRoutes />

              <Snackbar />
            </BottomSheetContextProvider>
          </TransactionContextProvider>
        </AuthContextProvider>
      </SnackbarContextProvider>
    </GestureHandlerRootView>
  );
}
