import { Module } from '@nestjs/common';
import { ProductosController } from './http/productos.controller';
import { productoRepositoryDefinition } from '../dominio/producto.repository';
import { ProductoRepositoryImpl } from './persistence/productos.repository.impl';
import { ObtenerProductos } from '../application/use-case/obtener-productos.use-case';

@Module({
  controllers: [ProductosController],
  providers: [
    ObtenerProductos,
    {
      provide: productoRepositoryDefinition.name,
      useClass: ProductoRepositoryImpl,
    },
  ],
})
export class ProductosModulo {}
