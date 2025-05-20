import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Venta } from '../../dominio/venta';
import { VentaRepository } from '../../dominio/venta.repository';

@Injectable()
export class PrismaVentaRepository implements VentaRepository {
  constructor(private _prismaService: PrismaService) {}

  async create({ ventaDetalles, ...ventaParm }: Venta): Promise<Venta> {
    const venta = await this._prismaService.venta.create({
      data: {
        ...ventaParm,
        detalles: {
          createMany: {
            data: ventaDetalles.map((a) => ({
              ...a,
              usuarioCreadorId: ventaParm.usuarioCreadorId,
              usuarioActualizadorId: ventaParm.usuarioActualizadorId,
            })),
          },
        },
      },
    });

    return venta as unknown as Venta;
  }
}
