import { MaterialIcons } from "@expo/vector-icons";
import clsx from "clsx";
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
  const { transactions, filters } = useTransactionContext();

  const iconData = ICONS[type];
  const cardData = CARD_DATA[type];

  const lastTransaction = transactions.find(
    ({ type: transactionType }) => transactionType.id === type,
  );

  function renderDateInfo() {
    if (type === "total") {
      return (
        <Text className="text-white">
          {filters.from && filters.to
            ? `${format(filters.from, "dd MMMM", { locale: ptBR })} até ${format(filters.to, "dd MMMM", { locale: ptBR })}`
            : `Todo o período`}
        </Text>
      );
    } else {
      return (
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
      );
    }
  }

  return (
    <View
      className={clsx(
        `bg-${cardData.bgColor} mr-6 min-w-[280] justify-between rounded-md px-8 py-6`,
        type === "total" && "mr-12",
      )}
    >
      <View className="flex-row items-center justify-between">
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

        {renderDateInfo()}
      </View>
    </View>
  );
}
