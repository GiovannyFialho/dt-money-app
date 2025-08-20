import { View } from "react-native";

import { LoginForm } from "@/screens/login/login-form";

import { AuthHeader } from "@/components/auth-header";
import { DismissKeyboardView } from "@/components/dismiss-keyboard-view";

export function Login() {
  return (
    <DismissKeyboardView>
      <View className="w-[82%] flex-1 self-center">
        <AuthHeader />

        <LoginForm />
      </View>
    </DismissKeyboardView>
  );
}
