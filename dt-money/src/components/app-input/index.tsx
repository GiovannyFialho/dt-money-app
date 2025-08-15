import { colors } from "@/shared/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import {
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";

type AppInputParams<T extends FieldValues> = TextInputProps & {
  control: Control<T>;
  name: Path<T>;
  leftIconName?: keyof typeof MaterialIcons.glyphMap;
  lable?: string;
};

export function AppInput<T extends FieldValues>({
  control,
  name,
  lable,
  leftIconName,
  ...rest
}: AppInputParams<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <View className="w-full">
          {lable && <Text className="text-white">{lable}</Text>}

          <TouchableOpacity className="h-16 flex-row items-center justify-between border-b border-gray-600 px-3 py-2">
            <TextInput
              value={value}
              onChangeText={onChange}
              {...rest}
              placeholderTextColor={colors.gray[700]}
            />
          </TouchableOpacity>
        </View>
      )}
    />
  );
}
