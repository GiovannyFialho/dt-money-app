import { NavigationContainer } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { SystemBars } from "react-native-edge-to-edge";

import { useAuthContext } from "@/context/auth.context";

import { PrivateRoutes } from "@/routes/private-routes";
import { PublicRoutes } from "@/routes/public-routes";

import { Loading } from "@/screens/loading";

export function NavigationRoutes() {
  const [loading, setLoading] = useState(true);

  const { user, token } = useAuthContext();

  const Routes = useCallback(() => {
    if (loading) {
      return <Loading setLoading={setLoading} />;
    }

    if (!user || !token) {
      return <PublicRoutes />;
    } else {
      return <PrivateRoutes />;
    }
  }, [user, token, loading]);

  return (
    <NavigationContainer>
      <SystemBars style="light" />
      <Routes />
    </NavigationContainer>
  );
}
