import { useForm } from "react-hook-form";

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
    <>
      <AppInput
        control={control}
        name="email"
        lable="E-mail"
        placeholder="email@exemple.com"
      />
    </>
  );
}
