import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

import { colors } from "@/shared/colors";

import { DeleteModal } from "@/screens/home/transaction-card/right-action/delete-modal";

export function RightAction() {
  const [modalVisible, setModalVisible] = useState(false);

  function showModal() {
    setModalVisible(true);
  }

  function hideModal() {
    setModalVisible(false);
  }

  return (
    <>
      <TouchableOpacity
        className="h-[140] w-[80] items-center justify-center rounded-r-md bg-accent-red-background-primary"
        activeOpacity={0.8}
        onPress={showModal}
      >
        <MaterialIcons name="delete-outline" size={30} color={colors.white} />
      </TouchableOpacity>

      <DeleteModal visible={modalVisible} hideModal={hideModal} />
    </>
  );
}
