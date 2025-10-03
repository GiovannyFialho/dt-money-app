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
    loadings,
    handleLoadings,
    refreshTransactions,
    fetchCategories,
    fetchTransactions,
    loadMoreTransactions,
  } = useTransactionContext();
  const { handleError } = useErrorHandler();

  async function handleFetchCategories() {
    try {
      handleLoadings({ key: "initial", value: true });

      await fetchCategories();
    } catch (error) {
      handleError(error);
    } finally {
      handleLoadings({ key: "initial", value: false });
    }
  }

  async function handleFetchInitialTransactions() {
    try {
      handleLoadings({ key: "initial", value: true });

      await fetchTransactions({ page: 1 });
    } catch (error) {
      handleError(error, "Falha ao buscar transações");
    } finally {
      handleLoadings({ key: "initial", value: false });
    }
  }

  async function handleLoadMoreTransactions() {
    try {
      handleLoadings({ key: "loadMore", value: true });

      await loadMoreTransactions();
    } catch (error) {
      handleError(error, "Falha ao carregar novas transações");
    } finally {
      handleLoadings({ key: "loadMore", value: false });
    }
  }

  async function handleRefreshTransactions() {
    try {
      handleLoadings({ key: "refresh", value: true });

      await refreshTransactions();
    } catch (error) {
      handleError(error, "Falha ao recarregar as transações");
    } finally {
      handleLoadings({ key: "refresh", value: false });
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
            refreshing={loadings.refresh}
            onRefresh={handleRefreshTransactions}
          />
        }
      />
    </SafeAreaView>
  );
}
