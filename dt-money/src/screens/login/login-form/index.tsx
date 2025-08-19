import { useForm } from "react-hook-form";
import { Text, View } from "react-native";

import { AppButton } from "@/components/app-button";
import { AppInput } from "@/components/app-input";

export interface LoginFormParams {
  email: string;
  password: string;
}

export function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormParams>();

  return (
    <View className="flex-1">
      <AppInput
        control={control}
        name="email"
        lable="EMAIL"
        placeholder="mail@example.br"
        leftIconName="mail-outline"
      />

      <AppInput
        control={control}
        name="password"
        lable="SENHA"
        placeholder="Sua senha"
        leftIconName="lock-outline"
        secureTextEntry
      />

      <View className="mb-6 mt-8 min-h-[250px] flex-1 justify-between">
        <AppButton iconName="arrow-forward">Login</AppButton>

        <View>
          <Text className="mb-6 text-base text-gray-300">
            Ainda não possui uma conta?
          </Text>

          <AppButton iconName="arrow-forward" mode="outline">
            Cadastrar
          </AppButton>
        </View>
      </View>
    </View>
  );
}
