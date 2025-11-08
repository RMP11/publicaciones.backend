// src/cupones/cupones.controller.ts
import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { CuponesService } from './cupones.service';
import { ApiBody } from '@nestjs/swagger';
import { Public } from 'src/shared/decorators/public.decorator';

@Controller('cupones')
export class CuponesController {
  constructor(private readonly cuponesService: CuponesService) {}

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
  generar(@Body() body: any) {
    return this.cuponesService.generar(body);
  }

  @Public()
  @Post('circuitBreaker')
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
  generarCiruit(@Body() body: any) {
    return this.cuponesService.crearCuponCircuit(body);
  }
}
