import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Report } from '../entities/report.entity';
import { Producer } from '@nestjs/microservices/external/kafka.interface';
import { format, parseISO } from 'date-fns';

@Injectable()
export class RequestReportGenerateService {
  constructor(
    @InjectModel(Report) private reportModel: typeof Report,
    @Inject('KAFKA_PRODUCER')
    private kafkaProducer: Producer
    ) {
    this.reportModel.afterCreate((instance, options) => {
      this.afterCreate(instance);
    });
  }

  async afterCreate(instance: Report) {
    await this.kafkaProducer.send({
      topic: 'reports-create',
      messages: [
        {
          key: 'reports',
          value: JSON.stringify(
            {
              id: instance.id,
              start_date: this.formatDate(instance.start_date.toISOString()),
              end_date: this.formatDate(instance.end_date.toISOString()),
              account_id : instance.account_id
            }
          )
        }
      ]
    })
  }

  private formatDate(dateString: string): string {
    const parsedDate = parseISO(dateString);
    const formattedDate = format(parsedDate, 'yyyy-MM-dd');
    return formattedDate;
  }
}
