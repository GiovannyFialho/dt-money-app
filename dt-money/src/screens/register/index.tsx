import { View } from "react-native";

import { AuthHeader } from "@/components/auth-header";
import { DismissKeyboardView } from "@/components/dismiss-keyboard-view";

import { RegisterForm } from "@/screens/register/register-form";

export function Register() {
  return (
    <DismissKeyboardView>
      <View className="w-[82%] flex-1 self-center">
        <AuthHeader />

        <RegisterForm />
      </View>
    </DismissKeyboardView>
  );
}
