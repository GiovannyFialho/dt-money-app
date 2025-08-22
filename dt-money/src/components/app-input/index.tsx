import { MaterialIcons } from "@expo/vector-icons";
import clsx from "clsx";
import { useRef, useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import {
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";

import { colors } from "@/shared/colors";

import { ErrorMessage } from "@/components/error-message";

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
  secureTextEntry,
  ...rest
}: AppInputParams<T>) {
  const [isFocused, setIsFocused] = useState(false);
  const [showText, setShowText] = useState(secureTextEntry);

  const inputRef = useRef<TextInput>(null);

  function checkFocus() {
    if (inputRef.current) {
      setIsFocused(inputRef.current.isFocused());
    }
  }
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View className="mt-4 w-full">
          {lable && (
            <Text
              className={clsx(
                "mb-2 mt-3 text-base",
                isFocused ? "text-accent-brand" : "text-gray-600",
              )}
            >
              {lable}
            </Text>
          )}

          <TouchableOpacity className="h-16 flex-row items-center justify-between border-b border-gray-600 px-3 py-2">
            {leftIconName && (
              <MaterialIcons
                name={leftIconName}
                color={isFocused ? colors["accent-brand"] : colors.gray[600]}
                size={24}
                className="mr-2"
              />
            )}

            <TextInput
              value={value}
              className="flex-1 text-base text-gray-500"
              onChangeText={onChange}
              placeholderTextColor={colors.gray[700]}
              ref={inputRef}
              secureTextEntry={showText}
              onFocus={checkFocus}
              onEndEditing={checkFocus}
              {...rest}
            />

            {secureTextEntry && (
              <TouchableOpacity onPress={() => setShowText((value) => !value)}>
                <MaterialIcons
                  name={showText ? "visibility" : "visibility-off"}
                  color={colors.gray[600]}
                  size={24}
                />
              </TouchableOpacity>
            )}
          </TouchableOpacity>

          {error?.message && <ErrorMessage>{error.message}</ErrorMessage>}
        </View>
      )}
    />
  );
}
