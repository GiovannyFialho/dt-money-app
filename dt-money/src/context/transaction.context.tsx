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

type Loadings = {
  initial: boolean;
  refresh: boolean;
  loadMore: boolean;
};

type HandleLoadingParams = { key: keyof Loadings; value: boolean };

export type TransactionContextType = {
  categories: TransactionCategory[];
  totalTransactions: TotalTransactions;
  transactions: Transaction[];
  loadings: Loadings;
  handleLoadings: (params: HandleLoadingParams) => void;
  refreshTransactions: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  createTransaction: (transaction: CreateTransactionInterface) => Promise<void>;
  updateTransaction: (transaction: UpdateTransactionInterface) => Promise<void>;
  fetchTransactions: (params: FetchTransactionParams) => Promise<void>;
  loadMoreTransactions: () => Promise<void>;
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
    totalPages: 0,
  });
  const [loadings, setLoadings] = useState<Loadings>({
    initial: false,
    loadMore: false,
    refresh: false,
  });

  function handleLoadings({ key, value }: HandleLoadingParams) {
    return setLoadings((prev) => ({ ...prev, [key]: value }));
  }

  const refreshTransactions = useCallback(async () => {
    const { page, perPage } = pagination;

    const transactionsResponse = await transactionService.getTransactions({
      page: 1,
      perPage: page * perPage,
    });

    setTransactions(transactionsResponse.data);
    setTotalTransactions(transactionsResponse.totalTransactions);
    setPagination({
      ...pagination,
      page,
      totalPages: transactionsResponse.totalPages,
      totalRows: transactionsResponse.totalRows,
    });
  }, [pagination]);

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
    },
    [pagination],
  );

  const loadMoreTransactions = useCallback(async () => {
    if (loadings.loadMore || pagination.page >= pagination.totalPages) return;

    fetchTransactions({ page: pagination.page + 1 });
  }, [loadings.loadMore, pagination]);

  return (
    <TransactionContext.Provider
      value={{
        categories,
        totalTransactions,
        transactions,
        loadings,
        handleLoadings,
        refreshTransactions,
        fetchCategories,
        createTransaction,
        updateTransaction,
        fetchTransactions,
        loadMoreTransactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactionContext() {
  return useContext(TransactionContext);
}
