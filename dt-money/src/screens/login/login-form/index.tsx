import { zodResolver } from "@hookform/resolvers/zod";
import { type NavigationProp, useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import z from "zod";

import { type PublicStackParamsList } from "@/routes/public-routes";

import { AppButton } from "@/components/app-button";
import { AppInput } from "@/components/app-input";

const loginFormSchema = z.object({
  email: z.email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

type LoginFormParams = z.infer<typeof loginFormSchema>;

export function LoginForm() {
  const navigation = useNavigation<NavigationProp<PublicStackParamsList>>();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<LoginFormParams>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginFormSchema),
  });

  async function handleLoginSubmit(data: LoginFormParams) {
    console.log({ loginData: data });

    reset();
  }

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
        <AppButton
          iconName="arrow-forward"
          onPress={handleSubmit(handleLoginSubmit)}
        >
          Login
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
