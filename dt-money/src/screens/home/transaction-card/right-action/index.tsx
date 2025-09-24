import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

import { colors } from "@/shared/colors";
import * as transactionService from "@/shared/services/dt-money/transaction.service";

import { DeleteModal } from "@/screens/home/transaction-card/right-action/delete-modal";
import { useSnackbarContext } from "../../../../context/snackbar.context";
import { useErrorHandler } from "../../../../hooks/useErrorHandler";

type RightActionProps = {
  transactionId: number;
};

export function RightAction({ transactionId }: RightActionProps) {
  const { handleError } = useErrorHandler();
  const { notify } = useSnackbarContext();

  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  function showModal() {
    setModalVisible(true);
  }

  function hideModal() {
    setModalVisible(false);
  }

  async function handleDeleteTransaction() {
    try {
      setLoading(true);

      await transactionService.deleteTransaction(transactionId);

      notify({
        message: "Transação deletada com sucesso",
        type: "SUCCESS",
      });
      hideModal();
    } catch (error) {
      handleError(error, "Falha ao deletar a transação");
    } finally {
      setLoading(false);
    }
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

      <DeleteModal
        visible={modalVisible}
        loading={loading}
        hideModal={hideModal}
        handleDeleteTransaction={handleDeleteTransaction}
      />
    </>
  );
}
