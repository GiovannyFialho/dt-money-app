import { createContext, ReactNode, useContext, useState } from "react";

import type { TransactionCategory } from "@/shared/interfaces/https/transaction-category-response";
import * as transactionService from "@/shared/services/dt-money/transaction.service";

export type TransactionContextType = {
  categories: TransactionCategory[];
  fetchCategories: () => Promise<void>;
};

export const TransactionContext = createContext({} as TransactionContextType);

type TransactionContextProviderProps = {
  children: ReactNode;
};

export function TransactionContextProvider({
  children,
}: TransactionContextProviderProps) {
  const [categories, setCategories] = useState<TransactionCategory[]>([]);

  async function fetchCategories() {
    const categoriesResponse =
      await transactionService.getTransactionCategories();

    setCategories(categoriesResponse);
  }

  return (
    <TransactionContext.Provider value={{ categories, fetchCategories }}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactionContext() {
  return useContext(TransactionContext);
}
