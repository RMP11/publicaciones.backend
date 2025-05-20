import { Inject } from '@nestjs/common';
import {
  SucursalRepository,
  sucursalRepositoryDefinition,
} from '../../dominio/sucursal.repository';
import { Sucursal } from '../../dominio/sucursales';

export class ObtenerSucursales {
  public constructor(
    @Inject(sucursalRepositoryDefinition.name)
    private readonly _sucursalRepository: SucursalRepository,
  ) {}
  public async execute(): Promise<Sucursal[]> {
    const sucursales = await this._sucursalRepository.findAll();
    return sucursales;
  }
}
