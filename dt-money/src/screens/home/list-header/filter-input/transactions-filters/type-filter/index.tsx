import Checkbox from "expo-checkbox";
import { Text, TouchableOpacity, View } from "react-native";

import { useTransactionContext } from "@/context/transaction.context";

import { TransactionType } from "@/shared/enums/transaction-type";

export function TypeFilter() {
  const { filters, handleFilters } = useTransactionContext();

  function selectType(typeId: TransactionType) {
    handleFilters({ key: "typeId", value: typeId });
  }

  return (
    <View>
      <Text className="mb-5 text-base font-medium text-gray-600">
        Tipo de transação
      </Text>

      <TouchableOpacity
        className="flex-row items-center py-2"
        onPress={() => selectType(TransactionType.REVENUE)}
      >
        <Checkbox
          value={filters.typeId === TransactionType.REVENUE}
          className="mr-4"
          onValueChange={() => selectType(TransactionType.REVENUE)}
        />

        <Text className="text-lg text-white">Entrada</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="flex-row items-center py-2"
        onPress={() => selectType(TransactionType.EXPENSE)}
      >
        <Checkbox
          value={filters.typeId === TransactionType.EXPENSE}
          className="mr-4"
          onValueChange={() => selectType(TransactionType.EXPENSE)}
        />

        <Text className="text-lg text-white">Saída</Text>
      </TouchableOpacity>
    </View>
  );
}
