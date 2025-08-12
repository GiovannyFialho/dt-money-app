import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Text, TouchableOpacity, View } from "react-native";

import { PublicStackParamsList } from "@/routes";

export function Login() {
  const navigation =
    useNavigation<StackNavigationProp<PublicStackParamsList>>();

  return (
    <View className="flex-1 items-center justify-center">
      <Text>Tela de login!</Text>

      <TouchableOpacity
        className="mt-5"
        onPress={() => navigation.navigate("register")}
      >
        <Text>Regitrar</Text>
      </TouchableOpacity>
    </View>
  );
}
