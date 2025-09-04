import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { useBottomSheetContext } from "@/context/bottom-sheet.context";

import { colors } from "@/shared/colors";
import { CreateTransactionInterface } from "@/shared/interfaces/https/create-transaction-request";

export function NewTransaction() {
  const { closeBottomSheet } = useBottomSheetContext();

  const [transaction, setTransaction] = useState<CreateTransactionInterface>({
    description: "",
    typeId: null,
    categoryId: null,
    value: null,
  });

  return (
    <View className="px-8 py-5">
      <TouchableOpacity
        className="w-full flex-row items-center justify-between"
        onPress={closeBottomSheet}
      >
        <Text className="text-xl font-bold text-white">Nova transação</Text>
        <MaterialIcons name="close" color={colors.gray[700]} size={20} />
      </TouchableOpacity>
    </View>
  );
}
