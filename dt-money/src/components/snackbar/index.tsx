import { Text, View } from "react-native";

import { useSnackbarContext } from "@/context/snackbar.context";

export function Snackbar() {
  const { message, type } = useSnackbarContext();

  if (!message || !type) {
    return;
  }

  const bgColor = `${type === "SUCCESS" ? "bg-accent-brand-background-primary" : "bg-accent-red-background-primary"}`;

  return (
    <View
      className={`absolute bottom-10 h-auto min-h-[50px] w-[90%] self-center rounded-xl ${bgColor} z-10 justify-center p-2`}
    >
      <Text className="text-center text-base font-bold text-white">
        {message}
      </Text>
    </View>
  );
}
