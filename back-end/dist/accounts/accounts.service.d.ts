import { Account } from './entities/account.entity';
export declare class AccountsService {
    private accountModel;
    constructor(accountModel: typeof Account);
    create(createAccountDto: any): Promise<Account>;
    findAll(): Promise<Account[]>;
    findOne(id: string): Promise<Account>;
}
