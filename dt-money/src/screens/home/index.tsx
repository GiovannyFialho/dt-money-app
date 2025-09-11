import { useEffect } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTransactionContext } from "@/context/transaction.context";

import { useErrorHandler } from "@/hooks/useErrorHandler";

import { AppHeader } from "@/components/app-header";

export function Home() {
  const { fetchCategories } = useTransactionContext();
  const { handleError } = useErrorHandler();

  async function handleFetchCategories() {
    try {
      await fetchCategories();
    } catch (error) {
      handleError(error, "Erro ao carregar as categorias");
    }
  }

  useEffect(() => {
    (async () => await handleFetchCategories())();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <AppHeader />

      <Text className="text-white">Home</Text>
    </SafeAreaView>
  );
}
