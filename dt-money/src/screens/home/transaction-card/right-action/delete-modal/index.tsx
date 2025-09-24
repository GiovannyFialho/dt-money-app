import { MaterialIcons } from "@expo/vector-icons";
import {
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { colors } from "@/shared/colors";

type DeleteModalProps = {
  visible: boolean;
  hideModal: () => void;
};

export function DeleteModal({ visible, hideModal }: DeleteModalProps) {
  return (
    <View className="absolute flex-1">
      <Modal
        animationType="slide"
        transparent
        visible={visible}
        onRequestClose={hideModal}
      >
        <TouchableWithoutFeedback onPress={hideModal}>
          <View className="flex-1 items-center justify-center bg-black/50">
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
              <View className="z-9 m-5 h-[322] w-[90%] items-center rounded-[16] bg-background-secondary p-8 shadow-lg">
                <View className="w-full flex-row items-center justify-between border-b border-gray-300 pb-6">
                  <View className="flex-row items-center gap-6">
                    <MaterialIcons
                      name="error-outline"
                      size={25}
                      color={colors.gray[400]}
                    />

                    <Text className="text-lg text-white">
                      Apagar transação?
                    </Text>
                  </View>

                  <TouchableOpacity>
                    <MaterialIcons
                      name="close"
                      size={25}
                      color={colors.gray[800]}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}
