import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { RegistrarVentaEnSucursal } from '../../application/use-case/registrar-venta-en-sucursal.use-case';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { CreateVentaDto } from '../dtos/crear-venta.dto';
import { Request } from 'express';
import { Usuario } from '@prisma/client';
import { ListarVentasPorSucursal } from '../../application/use-case/listar-ventas-por-sucursal.use-case';

@Controller('ventas')
@ApiBearerAuth()
export class VentasController {
  constructor(
    private readonly _registrarVentaEnSucursal: RegistrarVentaEnSucursal,
    private readonly _listarVentasPorSucursal: ListarVentasPorSucursal,
  ) {}

  @Get()
  obtener(
    @Query('sucursalId', new ParseIntPipe({ optional: true }))
    sucursalId: number,
  ) {
    return this._listarVentasPorSucursal.execute(sucursalId);
  }

  @ApiBody({
    type: CreateVentaDto,
  })
  @Post()
  public async execute(
    @Body() body: CreateVentaDto,
    @Req()
    req: Request & {
      usuario?: { sub: Usuario & { empleado: { id: number } } };
    },
  ) {
    const sub = req.usuario?.sub;

    const venta = await this._registrarVentaEnSucursal.execute(body, sub);

    return venta;
  }
}
