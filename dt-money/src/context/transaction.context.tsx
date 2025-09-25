import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

import type { CreateTransactionInterface } from "@/shared/interfaces/https/create-transaction-request";
import type { TotalTransactions } from "@/shared/interfaces/https/total-transactions";
import type { TransactionCategory } from "@/shared/interfaces/https/transaction-category-response";
import type { UpdateTransactionInterface } from "@/shared/interfaces/https/update-transaction-request";
import type { Transaction } from "@/shared/interfaces/transaction";
import * as transactionService from "@/shared/services/dt-money/transaction.service";

export type TransactionContextType = {
  categories: TransactionCategory[];
  totalTransactions: TotalTransactions;
  transactions: Transaction[];
  fetchCategories: () => Promise<void>;
  createTransaction: (transaction: CreateTransactionInterface) => Promise<void>;
  updateTransaction: (transaction: UpdateTransactionInterface) => Promise<void>;
  fetchTransactions: () => Promise<void>;
};

export const TransactionContext = createContext({} as TransactionContextType);

type TransactionContextProviderProps = {
  children: ReactNode;
};

export function TransactionContextProvider({
  children,
}: TransactionContextProviderProps) {
  const [categories, setCategories] = useState<TransactionCategory[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalTransactions, setTotalTransactions] = useState<TotalTransactions>(
    {
      expense: 0,
      revenue: 0,
      total: 0,
    },
  );

  async function fetchCategories() {
    const categoriesResponse =
      await transactionService.getTransactionCategories();

    setCategories(categoriesResponse);
  }

  async function createTransaction(transaction: CreateTransactionInterface) {
    await transactionService.createTransaction(transaction);
  }

  async function updateTransaction(transaction: UpdateTransactionInterface) {
    await transactionService.updateTransaction(transaction);
  }

  const fetchTransactions = useCallback(async () => {
    const transactionsResponse = await transactionService.getTransactions({
      page: 1,
      perPage: 10,
    });

    setTransactions(transactionsResponse.data);
    setTotalTransactions(transactionsResponse.totalTransactions);
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        categories,
        totalTransactions,
        transactions,
        fetchCategories,
        createTransaction,
        updateTransaction,
        fetchTransactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactionContext() {
  return useContext(TransactionContext);
}
