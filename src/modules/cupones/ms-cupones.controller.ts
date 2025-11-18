// src/cupones/cupones.controller.ts
import { Controller, Get, Param, Post, Body, Inject, Logger } from '@nestjs/common';
import { CuponesService } from './cupones.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/shared/decorators/public.decorator';
import {
  Client,
  ClientKafka,
  Transport,
  ClientKafkaProxy
} from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@ApiTags('Cupones - evento')
@Controller('ms-cupones')
export class MsCuponesController {
  constructor(
    @Inject("KAFKA_PRODUCER_SERVICE") private readonly kafkaClient: ClientKafka,
    private readonly logger: Logger
  ) {}

  async onModuleInit() {
    
    try {
      this.kafkaClient.subscribeToResponseOf('cupon.crear');

      // await this.kafkaClient.connect();
      
      this.logger.log(
        "Kafka Producer Client connected successfully",
        MsCuponesController.name
      );
    } catch (error) {
      this.logger.error(
        "Failed to connect Kafka Producer Client",
        error,
        MsCuponesController.name
      );
    }
  }

  @Post()
  @Public()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        codigo: { type: 'string', example: 'CUPON123' },
        descripcion: { type: 'string', example: 'Descuento de prueba' },
        tipoDescuento: { type: 'string', example: 'PORCENTAJE' },
        valorDescuento: { type: 'number', example: 20 },
        usosMaximos: { type: 'number', example: 5, nullable: true },
        fechaInicio: {
          type: 'string',
          format: 'date-time',
          example: '2025-11-06T00:00:00.000Z',
        },
        fechaFin: {
          type: 'string',
          format: 'date-time',
          example: '2025-12-31T23:59:59.000Z',
          nullable: true,
        },
      },
      required: [
        'codigo',
        'descripcion',
        'tipoDescuento',
        'valorDescuento',
        'fechaInicio',
      ],
    },
  })
  async generar(@Body() body: any) {
    const result = await lastValueFrom(
      this.kafkaClient.send('cupon.crear', body),
    );

    return result;
  }
}
