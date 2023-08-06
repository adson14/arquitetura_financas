import { Injectable } from '@nestjs/common';
import { Transaction } from './entities/transaction.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class TransactionsService {

  constructor(
    @InjectModel(Transaction) 
    private model: typeof Transaction
    ) {}

  create(createTransactionDto) {
    return this.model.create(createTransactionDto);
  }

  findAll() {
    return this.model.findAll();
  }
}
