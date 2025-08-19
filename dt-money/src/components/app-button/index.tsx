import { MaterialIcons } from "@expo/vector-icons";
import clsx from "clsx";
import { ReactNode } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

import { colors } from "@/shared/colors";

type AppButtonMode = "fill" | "outline";

type AppButtonProps = TouchableOpacityProps & {
  mode?: AppButtonMode;
  iconName?: keyof typeof MaterialIcons.glyphMap;
  children: ReactNode;
};

export function AppButton({
  mode = "fill",
  iconName,
  children,
  ...rest
}: AppButtonProps) {
  const isFill = mode === "fill";

  return (
    <TouchableOpacity
      className={clsx(
        "h-button w-full flex-row items-center rounded-xl px-5",
        iconName ? "justify-between" : "justify-center",
        {
          "bg-accent-brand": isFill,
          "border border-accent-brand bg-none": !isFill,
        },
      )}
      {...rest}
    >
      <Text
        className={clsx("text-base", {
          "text-white": isFill,
          "text-accent-brand": !isFill,
        })}
      >
        {children}
      </Text>

      {iconName && (
        <MaterialIcons
          name={iconName}
          size={24}
          color={isFill ? colors.white : colors["accent-brand"]}
        />
      )}
    </TouchableOpacity>
  );
}
