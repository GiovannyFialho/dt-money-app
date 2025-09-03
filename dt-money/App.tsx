import "@/styles/global.css";

import { NavigationRoutes } from "@/routes";

import { AuthContextProvider } from "@/context/auth.context";
import { BottomSheetContextProvider } from "@/context/bottom-sheet.context";
import { SnackbarContextProvider } from "@/context/snackbar.context";

import { Snackbar } from "@/components/snackbar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView className="flex-1">
      <SnackbarContextProvider>
        <AuthContextProvider>
          <BottomSheetContextProvider>
            <NavigationRoutes />

            <Snackbar />
          </BottomSheetContextProvider>
        </AuthContextProvider>
      </SnackbarContextProvider>
    </GestureHandlerRootView>
  );
}
