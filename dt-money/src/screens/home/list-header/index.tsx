import { ScrollView, View } from "react-native";

import { useTransactionContext } from "@/context/transaction.context";

import { TransactionType } from "@/shared/enums/transaction-type";

import { FilterInput } from "@/screens/home/list-header/filter-input";
import { TransactionCard } from "@/screens/home/list-header/transaction-card";

import { AppHeader } from "@/components/app-header";

export function ListHeader() {
  const { totalTransactions } = useTransactionContext();

  return (
    <>
      <AppHeader />

      <View className="mb-3 h-[150] w-full">
        <View className="h-[50] bg-background-primary" />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="absolute h-[141] pl-6"
        >
          <TransactionCard
            type={TransactionType.EXPENSE}
            amount={totalTransactions.expense}
          />

          <TransactionCard
            type={TransactionType.REVENUE}
            amount={totalTransactions.revenue}
          />

          <TransactionCard type={"total"} amount={totalTransactions.total} />
        </ScrollView>
      </View>

      <FilterInput />
    </>
  );
}
