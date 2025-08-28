import { Text, TouchableOpacity, View } from "react-native";

import { useAuthContext } from "@/context/auth.context";

export function Home() {
  const { handleLogout } = useAuthContext();

  return (
    <View>
      <Text>Home screen</Text>

      <TouchableOpacity className="mt-10" onPress={() => handleLogout()}>
        <Text>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}
