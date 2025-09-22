import { MaterialIcons } from "@expo/vector-icons";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Text, View } from "react-native";

import { useTransactionContext } from "@/context/transaction.context";

import { TransactionType } from "@/shared/enums/transaction-type";

import { CARD_DATA } from "@/screens/home/list-header/transaction-card/strategies/card-data-strategy";
import { ICONS } from "@/screens/home/list-header/transaction-card/strategies/icon-strategy";

export type TransactionCardType = TransactionType | "total";

type TransactionCardProps = {
  type: TransactionCardType;
  amount: number;
};

export function TransactionCard({ type, amount }: TransactionCardProps) {
  const { transactions } = useTransactionContext();

  const iconData = ICONS[type];
  const cardData = CARD_DATA[type];

  const lastTransaction = transactions.find(
    ({ type: transactionType }) => transactionType.id === type,
  );

  return (
    <View
      className={`bg-${cardData.bgColor} mr-6 min-w-[280] justify-between rounded-md px-8 py-6`}
    >
      <View className="mb-1 flex-row items-center justify-between">
        <Text className="text-base text-white">{cardData.label}</Text>
        <MaterialIcons name={iconData.name} size={26} color={iconData.color} />
      </View>

      <View className="flex-col gap-2">
        <Text className="text-2xl font-bold text-gray-400">
          {amount.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </Text>

        {type !== "total" && (
          <Text className="text-gray-700">
            {lastTransaction?.createdAt
              ? format(
                  lastTransaction?.createdAt,
                  `'Última ${cardData.label.toLocaleLowerCase()} em' d 'de' MMMM`,
                  {
                    locale: ptBR,
                  },
                )
              : "Nenhuma transação encontrada"}
          </Text>
        )}
      </View>
    </View>
  );
}
