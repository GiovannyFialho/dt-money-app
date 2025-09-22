import { MaterialIcons } from "@expo/vector-icons";

import { colors } from "@/shared/colors";
import { TransactionType } from "@/shared/enums/transaction-type";

import type { TransactionCardType } from "@/screens/home/list-header/transaction-card";

type IconsData = {
  name: keyof typeof MaterialIcons.glyphMap;
  color: string;
};

export const ICONS: Record<TransactionCardType, IconsData> = {
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
