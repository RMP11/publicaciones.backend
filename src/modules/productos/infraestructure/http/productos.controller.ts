import { Controller, Post } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ObtenerProductos } from '../../application/use-case/obtener-productos.use-case';

@Controller('productos')
@ApiBearerAuth()
export class ProductosController {
  constructor(private readonly _obtenerProductos: ObtenerProductos) {}

  @Post()
  public async execute() {
    return await this._obtenerProductos.execute();
  }
}
