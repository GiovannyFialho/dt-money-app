import { type NavigationProp, useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";

import { type PublicStackParamsList } from "@/routes/public-routes";

import { AppButton } from "@/components/app-button";
import { AppInput } from "@/components/app-input";

export interface RegisterFormParams {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export function RegisterForm() {
  const navigation = useNavigation<NavigationProp<PublicStackParamsList>>();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterFormParams>();

  return (
    <View className="flex-1">
      <AppInput
        control={control}
        name="name"
        lable="NOME"
        placeholder="Seu nome"
        leftIconName="person"
      />

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

      <AppInput
        control={control}
        name="confirmPassword"
        lable="SENHA"
        placeholder="Confirme sua senha"
        leftIconName="lock-outline"
        secureTextEntry
      />

      <View className="mb-6 mt-8 min-h-[250px] flex-1 justify-between">
        <AppButton iconName="arrow-forward">Cadastrar</AppButton>

        <View>
          <Text className="mb-6 text-base text-gray-300">
            Já possui uma conta?
          </Text>

          <AppButton
            iconName="arrow-forward"
            mode="outline"
            onPress={() => navigation.navigate("login")}
          >
            Acessar
          </AppButton>
        </View>
      </View>
    </View>
  );
}
