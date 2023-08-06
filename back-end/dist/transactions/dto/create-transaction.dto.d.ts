import { TransactionCategory, TransactionType } from '../entities/transaction.entity';
export declare class CreateTransactionDto {
    payment_date: Date;
    name: string;
    description: string;
    category: TransactionCategory;
    amount: number;
    type: TransactionType;
}
