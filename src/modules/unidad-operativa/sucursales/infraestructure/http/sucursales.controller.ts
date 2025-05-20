import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ObtenerSucursales } from '../../application/use-case/obtener-sucursales.use-case';

@Controller('sucursales')
@ApiBearerAuth()
export class SucursalesController {
  constructor(private _obtenerSucursales: ObtenerSucursales) {}

  @Get()
  public async execute() {
    return await this._obtenerSucursales.execute();
  }
}
