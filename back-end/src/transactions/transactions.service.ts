import { Injectable } from '@nestjs/common';
import { Transaction, TransactionType } from './entities/transaction.entity';
import { InjectModel } from '@nestjs/sequelize';
import { TenantService } from 'src/tenant/tenant/tenant.service';
import { Sequelize } from 'sequelize-typescript';
import { Account } from 'src/accounts/entities/account.entity';

@Injectable()
export class TransactionsService {

  constructor(
    @InjectModel(Transaction) private modelTransaction: typeof Transaction,
    @InjectModel(Account) private modelAccount: typeof Account,
    private tenantService: TenantService,
    private sequelize: Sequelize
    ) {}

  async create(createTransactionDto) {
    const atomic = await this.sequelize.transaction();

    try{
      const transaction = await this.modelTransaction.create({
        ...createTransactionDto,
        account_id: this.tenantService.tenant.id
      });
      const account = await this.modelAccount.findByPk(transaction.account_id, {
        lock: atomic.LOCK.UPDATE,
        transaction: atomic,
      });
      const amount =
      createTransactionDto.type === TransactionType.DEBIT
        ? -transaction.amount
        : transaction.amount;

      await account.update(
        { balance: account.balance + amount },
        { transaction: atomic },
      );

      await atomic.commit();

      return transaction;
    } catch(e) {
      await atomic.rollback();
      throw e;
    }
   
  }

  findAll() {
    return this.modelTransaction.findAll({
      where: {
        account_id: this.tenantService.tenant.id
      }
    });
  }
}
