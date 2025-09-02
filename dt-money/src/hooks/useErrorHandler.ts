import { useSnackbarContext } from "@/context/snackbar.context";

import { AppError } from "@/shared/helpers/app-error";

export function useErrorHandler() {
  const { notify } = useSnackbarContext();

  const handleError = (error: unknown, defaultMessage?: string) => {
    const isAppError = error instanceof AppError;

    const message = isAppError
      ? error.message
      : (defaultMessage ?? "Falha na requisição");

    notify({
      message,
      type: "ERROR",
    });
  };

  return { handleError };
}
