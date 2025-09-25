import { MaterialIcons } from "@expo/vector-icons";
import clsx from "clsx";
import { format } from "date-fns";
import { Text, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

import { colors } from "@/shared/colors";
import { TransactionType } from "@/shared/enums/transaction-type";
import type { Transaction } from "@/shared/interfaces/transaction";

import { LeftAction } from "@/screens/home/transaction-card/left-action";
import { RightAction } from "@/screens/home/transaction-card/right-action";

type TransactionCardProps = {
  transaction: Transaction;
};

export function TransactionCard({ transaction }: TransactionCardProps) {
  const isExpense = transaction.type.id === TransactionType.EXPENSE;

  return (
    <Swipeable
      containerStyle={{
        width: "90%",
        alignItems: "center",
        alignSelf: "center",
        marginTop: 10,
        marginBottom: 16,
        overflow: "visible",
      }}
      renderRightActions={() => <RightAction transactionId={transaction.id} />}
      overshootRight={false}
      renderLeftActions={() => <LeftAction transaction={transaction} />}
      overshootLeft={false}
    >
      <View className="h-[140] rounded-[6] bg-background-tertiary p-6">
        <Text className="text-base text-white">{transaction.description}</Text>

        <Text
          className={clsx(
            "mt-2 text-2xl font-bold",
            isExpense ? "text-accent-red" : "text-accent-brand-light",
          )}
        >
          {isExpense && "-"}
          {transaction.value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </Text>

        <View className="w-full flex-row items-center justify-between">
          <View className="mt-3 flex-row items-center">
            <MaterialIcons
              name="label-outline"
              color={colors.gray[700]}
              size={23}
            />

            <Text className="ml-2 text-base text-gray-700">
              {transaction.category.name}
            </Text>
          </View>

          <View className="mt-3 flex-row items-center">
            <MaterialIcons
              name="calendar-month"
              color={colors.gray[700]}
              size={20}
            />

            <Text className="ml-2 text-base text-gray-700">
              {format(transaction.createdAt, "dd/MM/yyyy")}
            </Text>
          </View>
        </View>
      </View>
    </Swipeable>
  );
}
