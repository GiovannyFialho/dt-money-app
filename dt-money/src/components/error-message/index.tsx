import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

import { colors } from "@/shared/colors";
import { ReactNode } from "react";

type ErrorMessageProps = {
  children: ReactNode;
};

export function ErrorMessage({ children }: ErrorMessageProps) {
  return (
    <View className="mt-1 flex-row items-center">
      <MaterialIcons
        name="error-outline"
        size={16}
        color={colors["accent-red-background-primary"]}
        className="mr-1"
      />
      <Text className="text-accent-red-background-primary">{children}</Text>
    </View>
  );
}
