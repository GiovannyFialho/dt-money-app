import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuthContext } from "@/context/auth.context";

import { AppHeader } from "@/components/app-header";

export function Home() {
  const { handleLogout } = useAuthContext();

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <AppHeader />

      <Text className="text-white">Home</Text>
    </SafeAreaView>
  );
}
