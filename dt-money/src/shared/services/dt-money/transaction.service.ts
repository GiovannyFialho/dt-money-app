import { dtMoneyApi } from "@/api/dt-money";

import type { CreateTransactionInterface } from "@/shared/interfaces/https/create-transaction-request";
import type { TransactionCategory } from "@/shared/interfaces/https/transaction-category-response";

export async function getTransactionCategories(): Promise<
  TransactionCategory[]
> {
  const { data } = await dtMoneyApi.get<TransactionCategory[]>(
    "/transaction/categories",
  );

  return data;
}

export async function createTransaction(
  transaction: CreateTransactionInterface,
) {
  await dtMoneyApi.post("/transaction", transaction);
}
