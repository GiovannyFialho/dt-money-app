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
    loadMoreTransactions,
  } = useTransactionContext();
  const { handleError } = useErrorHandler();

  async function handleFetchCategories() {
    try {
      await fetchCategories();
    } catch (error) {
      handleError(error);
    }
  }

  async function handleFetchInitialTransactions() {
    try {
      await fetchTransactions({ page: 1 });
    } catch (error) {
      handleError(error, "Falha ao buscar transações");
    }
  }

  async function handleLoadMoreTransactions() {
    try {
      await loadMoreTransactions();
    } catch (error) {
      handleError(error, "Falha ao carregar novas transações");
    }
  }

  async function handleRefreshTransactions() {
    try {
      await refreshTransactions();
    } catch (error) {
      handleError(error, "Falha ao recarregar as transações");
    }
  }

  useEffect(() => {
    (async () => {
      await Promise.all([
        handleFetchCategories(),
        handleFetchInitialTransactions(),
      ]);
    })();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <FlatList
        className="bg-background-secondary"
        data={transactions}
        keyExtractor={({ id }) => `transaction-${id}`}
        renderItem={({ item }) => <TransactionCard transaction={item} />}
        ListHeaderComponent={ListHeader}
        onEndReached={handleLoadMoreTransactions}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={handleRefreshTransactions}
          />
        }
      />
    </SafeAreaView>
  );
}
