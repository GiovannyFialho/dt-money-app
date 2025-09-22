import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

import { colors } from "@/shared/colors";
import { TransactionType } from "@/shared/enums/transaction-type";

type TransactionCardType = TransactionType | "total";

type TransactionCardProps = {
  type: TransactionCardType;
  amount: number;
};

type IconsData = {
  name: keyof typeof MaterialIcons.glyphMap;
  color: string;
};

type CardData = {
  label: string;
  bgColor: string;
};

const ICONS: Record<TransactionCardType, IconsData> = {
  [TransactionType.REVENUE]: {
    name: "arrow-circle-up",
    color: colors["accent-brand-light"],
  },
  [TransactionType.EXPENSE]: {
    name: "arrow-circle-down",
    color: colors["accent-red"],
  },
  total: {
    name: "attach-money",
    color: colors.white,
  },
};

const CARD_DATA: Record<TransactionCardType, CardData> = {
  [TransactionType.EXPENSE]: {
    label: "Saída",
    bgColor: "background-tertiary",
  },
  [TransactionType.REVENUE]: {
    label: "Entrada",
    bgColor: "background-tertiary",
  },
  total: {
    label: "Total",
    bgColor: "accent-brand-background-primary",
  },
};

export function TransactionCard({ type, amount }: TransactionCardProps) {
  const iconData = ICONS[type];
  const cardData = CARD_DATA[type];

  return (
    <View
      className={`bg-${cardData.bgColor} mr-6 min-w-[280] justify-between rounded-md px-8 py-6`}
    >
      <View className="mb-1 flex-row items-center justify-between">
        <Text className="text-base text-white">{cardData.label}</Text>
        <MaterialIcons name={iconData.name} size={26} color={iconData.color} />
      </View>

      <View>
        <Text className="text-2xl font-bold text-gray-400">
          {amount.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </Text>
      </View>
    </View>
  );
}
