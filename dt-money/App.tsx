import "@/styles/global.css";

import { NavigationRoutes } from "@/routes";

import { AuthContextProvider } from "@/context/auth.context";
import { BottomSheetContextProvider } from "@/context/bottom-sheet.context";
import { SnackbarContextProvider } from "@/context/snackbar.context";

import { Snackbar } from "@/components/snackbar";

export default function App() {
  return (
    <SnackbarContextProvider>
      <AuthContextProvider>
        <BottomSheetContextProvider>
          <NavigationRoutes />

          <Snackbar />
        </BottomSheetContextProvider>
      </AuthContextProvider>
    </SnackbarContextProvider>
  );
}
