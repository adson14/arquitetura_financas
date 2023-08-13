import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Report } from './entities/report.entity';
import { RequestReportGenerateService } from './request-report-generate/request-report-generate.service';
import { ClientKafka, ClientsModule } from '@nestjs/microservices';
import { makeKafkaOptions } from 'src/common/kafka-config';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Report
    ]),
    ClientsModule.registerAsync([
      {
        name: 'KAFKA_SERVICE',
        useFactory: () => makeKafkaOptions(),
      },
    ]),
  ],
  controllers: [ReportsController],
  providers: [ReportsService, RequestReportGenerateService, {
     provide: 'KAFKA_PRODUCER', 
     useFactory: async (KafkaService: ClientKafka) => {
      return KafkaService.connect();
     }, 
     inject: ['KAFKA_SERVICE']
    }]
})
export class ReportsModule {}
