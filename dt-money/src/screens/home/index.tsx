import { useEffect } from "react";
import { FlatList, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTransactionContext } from "@/context/transaction.context";

import { useErrorHandler } from "@/hooks/useErrorHandler";

import { ListHeader } from "@/screens/home/list-header";
import { TransactionCard } from "@/screens/home/transaction-card";

export function Home() {
  const {
    transactions,
    loading,
    refreshTransactions,
    fetchCategories,
    fetchTransactions,
  } = useTransactionContext();
  const { handleError } = useErrorHandler();

  async function handleFetchCategories() {
    try {
      await Promise.all([fetchCategories(), fetchTransactions({ page: 1 })]);
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
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refreshTransactions}
          />
        }
      />
    </SafeAreaView>
  );
}
