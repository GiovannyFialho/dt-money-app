import { NavigationContainer } from "@react-navigation/native";
import { useCallback, useState } from "react";

import { PrivateRoutes } from "@/routes/private-routes";
import { PublicRoutes } from "@/routes/public-routes";

export function NavigationRoutes() {
  const [user, setUser] = useState(undefined);

  const Routes = useCallback(() => {
    if (!user) {
      return <PublicRoutes />;
    } else {
      return <PrivateRoutes />;
    }
  }, [user]);

  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}
