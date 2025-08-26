import { NavigationContainer } from "@react-navigation/native";
import { useCallback } from "react";
import { SystemBars } from "react-native-edge-to-edge";

import { useAuthContext } from "@/context/auth.context";

import { PrivateRoutes } from "@/routes/private-routes";
import { PublicRoutes } from "@/routes/public-routes";

export function NavigationRoutes() {
  const { user, token } = useAuthContext();

  const Routes = useCallback(() => {
    if (!user || !token) {
      return <PublicRoutes />;
    } else {
      return <PrivateRoutes />;
    }
  }, [user]);

  return (
    <NavigationContainer>
      <SystemBars style="light" />
      <Routes />
    </NavigationContainer>
  );
}
