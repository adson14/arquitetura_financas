import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
export declare class AccountsController {
    private readonly accountsService;
    constructor(accountsService: AccountsService);
    create(createAccountDto: CreateAccountDto): Promise<import("./entities/account.entity").Account>;
    findAll(): Promise<import("./entities/account.entity").Account[]>;
    findOne(id: string): Promise<import("./entities/account.entity").Account>;
}
