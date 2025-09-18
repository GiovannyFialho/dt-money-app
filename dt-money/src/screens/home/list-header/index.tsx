import { ScrollView, View } from "react-native";

import { TransactionType } from "@/shared/enums/transaction-type";

import { AppHeader } from "@/components/app-header";

import { TransactionCard } from "@/screens/home/list-header/transaction-card";

export function ListHeader() {
  return (
    <>
      <AppHeader />

      <View className="h-[150] w-full">
        <View className="h-[50] bg-background-primary" />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="absolute h-[141] pl-6"
        >
          <TransactionCard type={TransactionType.EXPENSE} amount={0} />

          <TransactionCard type={TransactionType.REVENUE} amount={0} />
        </ScrollView>
      </View>
    </>
  );
}
