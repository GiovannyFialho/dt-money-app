import { TransactionType } from "@/shared/enums/transaction-type";

export interface CreateTransactionInterface {
  description: string;
  typeId: TransactionType | null;
  categoryId: number | null;
  value: number | null;
}
