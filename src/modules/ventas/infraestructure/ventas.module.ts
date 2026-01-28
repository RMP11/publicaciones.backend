import { Module } from '@nestjs/common';
import { ventaRepositoryDefinition } from '../dominio/venta.repository';
import { VentasController } from './http/ventas.controller';
import { PrismaVentaRepository } from './repository/prisma-venta.repository';
import { RegistrarVentaEnSucursal } from '../application/use-case/registrar-venta-en-sucursal.use-case';
import { ListarVentasPorSucursal } from '../application/use-case/listar-ventas-por-sucursal.use-case';

@Module({
  controllers: [VentasController],
  providers: [
    RegistrarVentaEnSucursal,
    ListarVentasPorSucursal,
    {
      provide: ventaRepositoryDefinition.name,
      useClass: PrismaVentaRepository,
    },
  ],
})
export class VentasModule {}
