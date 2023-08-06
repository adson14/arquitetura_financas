import { Model } from 'sequelize-typescript';
import { Account } from 'src/accounts/entities/account.entity';
export declare enum TransactionCategory {
    CATEGORY1 = "category1",
    CATEGORY2 = "category2"
}
export declare enum TransactionType {
    CREDIT = "credit",
    DEBIT = "debit"
}
export declare const TransactionCateroryList: string[];
export declare const TransactionTypeList: string[];
export declare class Transaction extends Model {
    id: string;
    payment_date: Date;
    name: string;
    description: string;
    category: TransactionCategory;
    amount: number;
    type: TransactionType;
    account_id: string;
    account: Account;
}
