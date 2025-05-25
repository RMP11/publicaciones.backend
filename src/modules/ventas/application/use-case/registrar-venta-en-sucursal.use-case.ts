import { Inject } from '@nestjs/common';
import {
  VentaRepository,
  ventaRepositoryDefinition,
} from '../../dominio/venta.repository';
import { Venta } from '../../dominio/venta';
import { CreateVentaDto } from '../../infraestructure/dtos/crear-venta.dto';
import { Usuario } from '@prisma/client';

export class RegistrarVentaEnSucursal {
  constructor(
    @Inject(ventaRepositoryDefinition.name)
    private readonly _ventaRepository: VentaRepository,
  ) {}

  public async execute(
    body: CreateVentaDto,
    usuario?: Usuario & { empleado: { id: number } },
  ) {
    const crearVenta = {
      ...body,
      empleadoId: usuario?.empleado?.id,
      usuarioCreadorId: usuario?.id,
      usuarioActualizadorId: usuario?.id,
    };
    const venta = Venta.create(crearVenta);

    return await this._ventaRepository.create(venta);
  }
}
