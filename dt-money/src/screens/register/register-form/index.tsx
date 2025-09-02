import { zodResolver } from "@hookform/resolvers/zod";
import { type NavigationProp, useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import z from "zod";

import { type PublicStackParamsList } from "@/routes/public-routes";

import { useErrorHandler } from "@/hooks/useErrorHandler";

import { useAuthContext } from "@/context/auth.context";

import { AppButton } from "@/components/app-button";
import { AppInput } from "@/components/app-input";

const registerFormSchema = z
  .object({
    name: z.string().min(3, "Campo obrigatório"),
    email: z.email("E-mail inválido"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    confirmPassword: z
      .string()
      .min(6, "A senha deve ter no mínimo 6 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "As senhas devem ser iguais",
    path: ["confirmPassword"],
  });

export type RegisterFormParams = z.infer<typeof registerFormSchema>;

export function RegisterForm() {
  const { handleRegister } = useAuthContext();

  const { handleError } = useErrorHandler();

  const navigation = useNavigation<NavigationProp<PublicStackParamsList>>();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterFormParams>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(registerFormSchema),
  });

  async function handleRegisterSubmit(userData: RegisterFormParams) {
    try {
      await handleRegister(userData);
    } catch (error) {
      handleError(error, "Falha ao cadastrar usuário");
    }
  }

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

      <AppInput
        control={control}
        name="confirmPassword"
        lable="SENHA"
        placeholder="Confirme sua senha"
        leftIconName="lock-outline"
        secureTextEntry
      />

      <View className="mb-6 mt-8 min-h-[250px] flex-1 justify-between">
        <AppButton
          iconName="arrow-forward"
          onPress={handleSubmit(handleRegisterSubmit)}
        >
          Cadastrar
        </AppButton>

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
