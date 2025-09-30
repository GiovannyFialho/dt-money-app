import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

import type { CreateTransactionInterface } from "@/shared/interfaces/https/create-transaction-request";
import type { Pagination } from "@/shared/interfaces/https/get-transaction-request";
import type { TotalTransactions } from "@/shared/interfaces/https/total-transactions";
import type { TransactionCategory } from "@/shared/interfaces/https/transaction-category-response";
import type { UpdateTransactionInterface } from "@/shared/interfaces/https/update-transaction-request";
import type { Transaction } from "@/shared/interfaces/transaction";
import * as transactionService from "@/shared/services/dt-money/transaction.service";

type FetchTransactionParams = {
  page: number;
};

export type TransactionContextType = {
  categories: TransactionCategory[];
  totalTransactions: TotalTransactions;
  transactions: Transaction[];
  loading: boolean;
  refreshTransactions: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  createTransaction: (transaction: CreateTransactionInterface) => Promise<void>;
  updateTransaction: (transaction: UpdateTransactionInterface) => Promise<void>;
  fetchTransactions: (params: FetchTransactionParams) => Promise<void>;
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
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    perPage: 15,
    totalRows: 0,
  });
  const [loading, setLoading] = useState(false);

  async function refreshTransactions() {
    setLoading(true);

    const transactionsResponse = await transactionService.getTransactions({
      page: 1,
      perPage: 10,
    });

    setTransactions(transactionsResponse.data);
    setTotalTransactions(transactionsResponse.totalTransactions);
    setLoading(false);
  }

  async function fetchCategories() {
    const categoriesResponse =
      await transactionService.getTransactionCategories();

    setCategories(categoriesResponse);
  }

  async function createTransaction(transaction: CreateTransactionInterface) {
    await transactionService.createTransaction(transaction);
    await refreshTransactions();
  }

  async function updateTransaction(transaction: UpdateTransactionInterface) {
    await transactionService.updateTransaction(transaction);
    await refreshTransactions();
  }

  const fetchTransactions = useCallback(
    async ({ page = 1 }: FetchTransactionParams) => {
      setLoading(true);

      const transactionsResponse = await transactionService.getTransactions({
        page,
        perPage: pagination.perPage,
      });

      if (page === 1) {
        setTransactions(transactionsResponse.data);
      } else {
        setTransactions((prev) => [...prev, ...transactionsResponse.data]);
      }

      setTotalTransactions(transactionsResponse.totalTransactions);
      setPagination({
        ...pagination,
        page,
        totalRows: transactionsResponse.totalRows,
      });
      setLoading(false);
    },
    [pagination],
  );

  return (
    <TransactionContext.Provider
      value={{
        categories,
        totalTransactions,
        transactions,
        loading,
        refreshTransactions,
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
