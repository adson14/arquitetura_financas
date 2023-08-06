import { Injectable } from '@nestjs/common';
import { Transaction } from './entities/transaction.entity';
import { InjectModel } from '@nestjs/sequelize';
import { TenantService } from 'src/tenant/tenant/tenant.service';

@Injectable()
export class TransactionsService {

  constructor(
    @InjectModel(Transaction) 
    private model: typeof Transaction,
    private tenantService: TenantService
    ) {}

  create(createTransactionDto) {
    return this.model.create({
      ...createTransactionDto,
      account_id: this.tenantService.tenant.id
    });
  }

  findAll() {
    return this.model.findAll({
      where: {
        account_id: this.tenantService.tenant.id
      }
    });
  }
}
