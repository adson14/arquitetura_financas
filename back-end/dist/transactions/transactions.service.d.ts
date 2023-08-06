import { Transaction } from './entities/transaction.entity';
export declare class TransactionsService {
    private model;
    constructor(model: typeof Transaction);
    create(createTransactionDto: any): Promise<Transaction>;
    findAll(): Promise<Transaction[]>;
}
