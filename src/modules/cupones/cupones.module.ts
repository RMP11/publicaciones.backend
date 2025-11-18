import { HttpModule } from '@nestjs/axios';
import { Module, Logger } from '@nestjs/common';
import { CuponesService } from './cupones.service';
import { CuponesController } from './cupones.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MsCuponesController } from './ms-cupones.controller';
import { Partitioners } from 'kafkajs';

@Module({
  imports: [
    HttpModule.register({
      baseURL: process.env.URL_BASE_CUPONES,
    }),
    ClientsModule.register([
      {
        name: "KAFKA_PRODUCER_SERVICE",
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: "cupon-service-producer",
            brokers: ['kafka:9092']
          },
        },
      },
    ]),
  ],
  controllers: [CuponesController, MsCuponesController],
  providers: [CuponesService, Logger],
})
export class CuponesModule {}
