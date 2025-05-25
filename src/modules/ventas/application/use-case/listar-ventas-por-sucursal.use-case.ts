import { Inject } from '@nestjs/common';
import {
  VentaRepository,
  ventaRepositoryDefinition,
} from '../../dominio/venta.repository';

export class ListarVentasPorSucursal {
  constructor(
    @Inject(ventaRepositoryDefinition.name)
    private readonly _ventaRepository: VentaRepository,
  ) {}

  public async execute(sucursalId: number) {
    return await this._ventaRepository.findAll({ sucursalId });
  }
}
