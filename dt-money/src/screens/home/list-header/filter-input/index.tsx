import { MaterialIcons } from "@expo/vector-icons";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

import { useTransactionContext } from "@/context/transaction.context";

import { colors } from "@/shared/colors";

export function FilterInput() {
  const { pagination } = useTransactionContext();

  return (
    <View className="mb-4 w-[90%] self-center">
      <View className="mb-3 mt-4 w-full flex-row items-center justify-between">
        <Text className="text-xl font-bold text-white">Transações</Text>
        <Text className="text-base text-gray-700">
          {pagination.totalRows} {pagination.totalRows === 1 ? "Item" : "Itens"}
        </Text>
      </View>

      <TouchableOpacity className="h-16 flex-row items-center justify-between">
        <TextInput
          className="h-[50] w-full bg-background-primary pl-4 text-lg text-white"
          placeholderTextColor={colors.gray[600]}
          placeholder="Busque uma transação"
        />
        <TouchableOpacity className="absolute right-0">
          <MaterialIcons
            name="filter-list"
            color={colors["accent-brand-light"]}
            size={26}
            className="mr-3"
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
}
