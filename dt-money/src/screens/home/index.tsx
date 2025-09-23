import { useEffect } from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTransactionContext } from "@/context/transaction.context";

import { useErrorHandler } from "@/hooks/useErrorHandler";

import { ListHeader } from "@/screens/home/list-header";
import { TransactionCard } from "@/screens/home/transaction-card";

export function Home() {
  const { transactions, fetchCategories, fetchTransactions } =
    useTransactionContext();
  const { handleError } = useErrorHandler();

  async function handleFetchCategories() {
    try {
      await Promise.all([fetchCategories(), fetchTransactions()]);
    } catch (error) {
      handleError(error, "Erro ao carregar as categorias");
    }
  }

  useEffect(() => {
    (async () => await handleFetchCategories())();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <FlatList
        className="bg-background-secondary"
        data={transactions}
        keyExtractor={({ id }) => `transaction-${id}`}
        renderItem={({ item }) => <TransactionCard transaction={item} />}
        ListHeaderComponent={ListHeader}
      />
    </SafeAreaView>
  );
}
