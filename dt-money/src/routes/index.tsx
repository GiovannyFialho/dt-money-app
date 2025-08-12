import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Login } from "@/screens/login";
import { Register } from "@/screens/register";

export type PublicStackParamsList = {
  login: undefined;
  register: undefined;
};

export function NavigationRoutes() {
  const PublicStack = createStackNavigator<PublicStackParamsList>();

  return (
    <NavigationContainer>
      <PublicStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <PublicStack.Screen name="login" component={Login} />
        <PublicStack.Screen name="register" component={Register} />
      </PublicStack.Navigator>
    </NavigationContainer>
  );
}
