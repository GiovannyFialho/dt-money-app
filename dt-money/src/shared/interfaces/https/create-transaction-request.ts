export interface CreateTransactionInterface {
  description: string;
  typeId: number | null;
  categoryId: number | null;
  value: number | null;
}
