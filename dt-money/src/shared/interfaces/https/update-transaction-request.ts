import { TransactionType } from "@/shared/enums/transaction-type";

export interface UpdateTransactionInterface {
  id: number;
  description: string;
  typeId: TransactionType | null;
  categoryId: number | null;
  value: number | null;
}
