import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Text, TouchableOpacity } from "react-native";

import { PublicStackParamsList } from "@/routes/public-routes";
import { TextInput } from "react-native-gesture-handler";

import { DismissKeyboardView } from "@/components/dismiss-keyboard-view";

export function Login() {
  const navigation =
    useNavigation<StackNavigationProp<PublicStackParamsList>>();

  return (
    <DismissKeyboardView>
      <Text>Tela de login!</Text>

      <TextInput className="h-10 w-full bg-gray-500" />

      <TouchableOpacity
        className="mt-5"
        onPress={() => navigation.navigate("register")}
      >
        <Text>Regitrar</Text>
      </TouchableOpacity>
    </DismissKeyboardView>
  );
}
