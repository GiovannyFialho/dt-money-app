import { MaterialIcons } from "@expo/vector-icons";
import { View } from "react-native";

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

export function TransactionCard({ type, amount }: TransactionCardProps) {
  const iconData = ICONS[type];

  return (
    <View>
      <MaterialIcons name={iconData.name} size={26} color={iconData.color} />
    </View>
  );
}
