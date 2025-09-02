import { zodResolver } from "@hookform/resolvers/zod";
import { type NavigationProp, useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Text, View } from "react-native";
import z from "zod";

import { colors } from "@/shared/colors";

import { useAuthContext } from "@/context/auth.context";

import { useErrorHandler } from "@/hooks/useErrorHandler";

import { type PublicStackParamsList } from "@/routes/public-routes";

import { AppButton } from "@/components/app-button";
import { AppInput } from "@/components/app-input";

const loginFormSchema = z.object({
  email: z.email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export type LoginFormParams = z.infer<typeof loginFormSchema>;

export function LoginForm() {
  const { handleAuthenticate } = useAuthContext();

  const { handleError } = useErrorHandler();

  const navigation = useNavigation<NavigationProp<PublicStackParamsList>>();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormParams>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginFormSchema),
  });

  async function handleLoginSubmit(userData: LoginFormParams) {
    try {
      await handleAuthenticate(userData);
    } catch (error) {
      handleError(error, "Falha ao fazer o login");
    }
  }

  return (
    <View className="flex-1">
      <AppInput
        control={control}
        keyboardType="email-address"
        name="email"
        lable="EMAIL"
        placeholder="mail@example.br"
        leftIconName="mail-outline"
        autoCapitalize="none"
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
        <AppButton
          iconName={isSubmitting ? undefined : "arrow-forward"}
          onPress={handleSubmit(handleLoginSubmit)}
        >
          {isSubmitting ? <ActivityIndicator color={colors.white} /> : "Login"}
        </AppButton>

        <View>
          <Text className="mb-6 text-base text-gray-300">
            Ainda não possui uma conta?
          </Text>

          <AppButton
            iconName="arrow-forward"
            mode="outline"
            onPress={() => navigation.navigate("register")}
          >
            Cadastrar
          </AppButton>
        </View>
      </View>
    </View>
  );
}
