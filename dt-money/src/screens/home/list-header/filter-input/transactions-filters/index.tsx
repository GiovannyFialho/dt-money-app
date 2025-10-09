import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

import { useBottomSheetContext } from "@/context/bottom-sheet.context";
import { useTransactionContext } from "@/context/transaction.context";

import { colors } from "@/shared/colors";

import { useErrorHandler } from "@/hooks/useErrorHandler";

import { AppButton } from "@/components/app-button";

import { CategoryFilter } from "@/screens/home/list-header/filter-input/transactions-filters/category-filter";
import { DateFilter } from "@/screens/home/list-header/filter-input/transactions-filters/date-filter";
import { TypeFilter } from "@/screens/home/list-header/filter-input/transactions-filters/type-filter";

export function TransactionsFilters() {
  const { closeBottomSheet } = useBottomSheetContext();
  const { fetchTransactions, resetFilter, handleLoadings } =
    useTransactionContext();
  const { handleError } = useErrorHandler();

  async function handleResetFilters() {
    try {
      handleLoadings({ key: "refresh", value: true });
      await resetFilter();
    } catch (error) {
      handleError(error, "Falha ao limpar filtros");
    } finally {
      handleLoadings({ key: "refresh", value: false });
      closeBottomSheet();
    }
  }

  async function handleFetchTransactions() {
    try {
      handleLoadings({ key: "refresh", value: true });
      await fetchTransactions({ page: 1 });
    } catch (error) {
      handleError(error, "Falha ao aplicar filtros");
    } finally {
      handleLoadings({ key: "refresh", value: false });
      closeBottomSheet();
    }
  }

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

      <TypeFilter />

      <View className="mt-8 flex-row gap-4">
        <AppButton
          className="flex-1"
          mode="outline"
          widthFull={false}
          onPress={handleResetFilters}
        >
          Limpar Filtro
        </AppButton>

        <AppButton
          className="flex-1"
          widthFull={false}
          onPress={handleFetchTransactions}
        >
          Filtrar
        </AppButton>
      </View>
    </View>
  );
}
