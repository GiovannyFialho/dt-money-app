import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

import { useBottomSheetContext } from "@/context/bottom-sheet.context";

import { colors } from "@/shared/colors";

import { CategoryFilter } from "@/screens/home/list-header/filter-input/transactions-filters/category-filter";
import { DateFilter } from "@/screens/home/list-header/filter-input/transactions-filters/date-filter";

export function TransactionsFilters() {
  const { closeBottomSheet } = useBottomSheetContext();

  return (
    <View className="flex-1 p-6">
      <View className="flex-row justify-between">
        <Text className="mb-5 text-xl font-bold text-white">
          Filtrar transações
        </Text>

        <TouchableOpacity onPress={closeBottomSheet}>
          <MaterialIcons name="close" size={20} color={colors.gray[600]} />
        </TouchableOpacity>
      </View>

      <DateFilter />

      <CategoryFilter />
    </View>
  );
}
