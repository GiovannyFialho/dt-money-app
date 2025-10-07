import clsx from "clsx";
import { format } from "date-fns";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";

export function DateFilter() {
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  function onStartCancel() {
    setShowStartDatePicker(false);
  }

  function onStartConfirm(selectedDate: Date) {
    setShowStartDatePicker(false);
  }

  function onEndCancel() {
    setShowEndDatePicker(false);
  }

  function onEndConfirm(selectedDate: Date) {
    setShowEndDatePicker(false);
  }

  return (
    <>
      <Text className="text-lg text-gray-700">Data</Text>

      <View className="mb-6 flex-row justify-between">
        <View className="w-[48%]">
          <TouchableOpacity
            className="rounded-md border-b border-gray-800 p-2"
            onPress={() => setShowStartDatePicker(true)}
          >
            <Text className={clsx("text-lg text-gray-700")}>
              {format(new Date(), "dd/MM/yyyy")}
            </Text>
          </TouchableOpacity>
        </View>

        <View className="w-[48%]">
          <TouchableOpacity
            className="rounded-md border-b border-gray-800 p-2"
            onPress={() => setShowEndDatePicker(true)}
          >
            <Text className={clsx("text-lg text-gray-700")}>
              {format(new Date(), "dd/MM/yyyy")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <DateTimePicker
        isVisible={showStartDatePicker}
        date={new Date()}
        onCancel={onStartCancel}
        onConfirm={onStartConfirm}
        mode="date"
        confirmTextIOS="Confirmar"
        cancelTextIOS="Cancelar"
        locale="pt-BR"
      />

      <DateTimePicker
        isVisible={showEndDatePicker}
        date={new Date()}
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
