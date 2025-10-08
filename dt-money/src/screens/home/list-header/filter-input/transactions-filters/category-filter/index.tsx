import { Text, TouchableOpacity, View } from "react-native";

import { useTransactionContext } from "@/context/transaction.context";
import Checkbox from "expo-checkbox";

export function CategoryFilter() {
  const { categories, filters, handleCategoryFilter } = useTransactionContext();

  return (
    <View className="mb-6">
      <Text className="mb-5 text-base font-medium text-gray-600">
        Categorias
      </Text>

      {categories.map(({ id, name }) => (
        <TouchableOpacity
          key={`category-${id}`}
          className="flex-row items-center py-2"
          onPress={() => handleCategoryFilter(id)}
        >
          <Checkbox
            value={Boolean(filters.categoryIds[id])}
            className="mr-4"
            onValueChange={() => handleCategoryFilter(id)}
          />

          <Text className="text-lg text-white">{name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
