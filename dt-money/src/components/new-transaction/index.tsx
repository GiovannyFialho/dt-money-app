import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import CurrencyInput from "react-native-currency-input";
import z from "zod";

import { useBottomSheetContext } from "@/context/bottom-sheet.context";

import { colors } from "@/shared/colors";
import { CreateTransactionInterface } from "@/shared/interfaces/https/create-transaction-request";

import { AppButton } from "@/components/app-button";
import { SelectCategoryModal } from "@/components/select-category-modal";
import { SelectType } from "@/components/select-type";

const transactionSchema = z.object({
  description: z.string().min(4, "Descrição é obrigatória"),
  value: z.number().min(0.01, "Deve ser no mínimo 0,01"),
  typeId: z
    .number()
    .min(1, "Selecione um tipo de transação")
    .nullable()
    .refine((val) => val !== null, {
      message: "Selecione um tipo de transação",
    }),
  categoryId: z
    .number()
    .min(1, "Selecione uma categoria de transação")
    .nullable()
    .refine((val) => val !== null, {
      message: "Selecione uma categoria de transação",
    }),
});

type ValidationErrorsTypes = Record<keyof CreateTransactionInterface, string>;

export function NewTransaction() {
  const { closeBottomSheet } = useBottomSheetContext();

  const [transaction, setTransaction] = useState<CreateTransactionInterface>({
    description: "",
    typeId: null,
    categoryId: null,
    value: 0,
  });
  const [validationErrors, setValidationErrors] =
    useState<ValidationErrorsTypes>();

  console.log({ validationErrors });

  async function handleCreateTransaction() {
    const result = transactionSchema.safeParse(transaction);

    if (!result.success) {
      const errors: ValidationErrorsTypes = {} as ValidationErrorsTypes;
      result.error.issues.forEach((err) => {
        const field = err.path[0] as keyof CreateTransactionInterface;
        errors[field] = err.message;
      });

      setValidationErrors(errors);

      return;
    }
  }

  function setTransactionData(
    key: keyof CreateTransactionInterface,
    value: string | number | null,
  ) {
    setTransaction((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <View className="px-8 py-5">
      <TouchableOpacity
        className="w-full flex-row items-center justify-between"
        onPress={closeBottomSheet}
      >
        <Text className="text-xl font-bold text-white">Nova transação</Text>
        <MaterialIcons name="close" color={colors.gray[700]} size={20} />
      </TouchableOpacity>

      <View className="my-8 flex-1">
        <TextInput
          value={transaction.description}
          placeholder="Descrição"
          placeholderTextColor={colors.gray[700]}
          onChangeText={(value) => setTransactionData("description", value)}
          className="my-2 h-[50px] rounded-md bg-background-primary pl-4 text-lg text-white"
        />

        <CurrencyInput
          value={transaction.value}
          prefix="R$ "
          delimiter="."
          separator=","
          precision={2}
          minValue={0}
          onChangeValue={(value) => setTransactionData("value", value ?? 0)}
          className="my-2 h-[50px] rounded-md bg-background-primary pl-4 text-lg text-white"
        />

        <SelectCategoryModal
          selectedCategory={transaction.categoryId}
          onSelect={(categoryId) =>
            setTransactionData("categoryId", categoryId)
          }
        />

        <SelectType
          typeId={transaction.typeId}
          setTransactionType={(typeId) => setTransactionData("typeId", typeId)}
        />

        <View className="my-4">
          <AppButton onPress={handleCreateTransaction}>Registrar</AppButton>
        </View>
      </View>
    </View>
  );
}
