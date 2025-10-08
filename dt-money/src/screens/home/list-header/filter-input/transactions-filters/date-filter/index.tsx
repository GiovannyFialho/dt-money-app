import clsx from "clsx";
import { format, isValid } from "date-fns";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";

import { useTransactionContext } from "@/context/transaction.context";
import { ptBR } from "date-fns/locale";

export function DateFilter() {
  const { filters, handleFilters } = useTransactionContext();

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  function onStartCancel() {
    setShowStartDatePicker(false);
  }

  function onStartConfirm(selectedDate: Date) {
    setShowStartDatePicker(false);
    handleFilters({ key: "from", value: selectedDate });
  }

  function onEndCancel() {
    setShowEndDatePicker(false);
  }

  function onEndConfirm(selectedDate: Date) {
    setShowEndDatePicker(false);
    handleFilters({ key: "to", value: selectedDate });
  }

  function formatDate(date?: Date) {
    if (!date || !isValid) {
      return undefined;
    }

    return format(date, "dd/MM/yyyy", {
      locale: ptBR,
    });
  }

  return (
    <>
      <Text className="mb-5 text-base font-medium text-gray-600">Data</Text>

      <View className="mb-6 flex-row justify-between">
        <View className="w-[48%]">
          <TouchableOpacity
            className="rounded-md border-b border-gray-800 p-2"
            onPress={() => setShowStartDatePicker(true)}
          >
            <Text
              className={clsx(
                "text-lg",
                filters.from ? "text-white" : "text-gray-700",
              )}
            >
              {formatDate(filters.from) || "De"}
            </Text>
          </TouchableOpacity>
        </View>

        <View className="w-[48%]">
          <TouchableOpacity
            className="rounded-md border-b border-gray-800 p-2"
            onPress={() => setShowEndDatePicker(true)}
          >
            <Text
              className={clsx(
                "text-lg",
                filters.to ? "text-white" : "text-gray-700",
              )}
            >
              {formatDate(filters.to) || "Até"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <DateTimePicker
        isVisible={showStartDatePicker}
        date={filters.from}
        onCancel={onStartCancel}
        onConfirm={onStartConfirm}
        mode="date"
        confirmTextIOS="Confirmar"
        cancelTextIOS="Cancelar"
        locale="pt-BR"
      />

      <DateTimePicker
        isVisible={showEndDatePicker}
        date={filters.to}
        onCancel={onEndCancel}
        onConfirm={onEndConfirm}
        mode="date"
        confirmTextIOS="Confirmar"
        cancelTextIOS="Cancelar"
        locale="pt-BR"
      />
    </>
  );
}
