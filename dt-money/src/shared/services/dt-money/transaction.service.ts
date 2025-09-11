import { dtMoneyApi } from "@/api/dt-money";

import type { TransactionCategory } from "@/shared/interfaces/https/transaction-category-response";

export async function getTransactionCategories(): Promise<
  TransactionCategory[]
> {
  const { data } = await dtMoneyApi.get<TransactionCategory[]>(
    "/transaction/categories",
  );

  return data;
}
