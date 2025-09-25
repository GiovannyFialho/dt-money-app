import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";

import { useBottomSheetContext } from "@/context/bottom-sheet.context";

import { colors } from "@/shared/colors";
import type { Transaction } from "@/shared/interfaces/transaction";

type LeftActionProps = {
  transaction: Transaction;
};

export function LeftAction({ transaction }: LeftActionProps) {
  const { openBottomSheet } = useBottomSheetContext();

  return (
    <TouchableOpacity
      onPress={() => {
        openBottomSheet(<></>, 1);
      }}
    >
      <View className="bg-accent-blue-background-primary h-[140] w-[80] items-center justify-center rounded-l-md">
        <MaterialIcons name="edit" size={30} color={colors.white} />
      </View>
    </TouchableOpacity>
  );
}
