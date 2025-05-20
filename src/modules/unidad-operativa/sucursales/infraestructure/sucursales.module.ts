import { Module } from '@nestjs/common';
import { SucursalesController } from './http/sucursales.controller';
import { sucursalRepositoryDefinition } from '../dominio/sucursal.repository';
import { SucursalRepositoryImple } from './persistence/sucursales.repository.impl';
import { ObtenerSucursales } from '../application/use-case/obtener-sucursales.use-case';

@Module({
  controllers: [SucursalesController],
  providers: [
    ObtenerSucursales,
    {
      provide: sucursalRepositoryDefinition.name,
      useClass: SucursalRepositoryImple,
    },
  ],
})
export class SucursalesModule {}
