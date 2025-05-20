import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SucursalRepository } from '../../dominio/sucursal.repository';
import { Sucursal } from '../../dominio/sucursales';

@Injectable()
export class SucursalRepositoryImple implements SucursalRepository {
  constructor(private _prismaService: PrismaService) {}

  async findAll() {
    const respuesta = await this._prismaService.sucursal.findMany();

    return respuesta as unknown as Sucursal[];
  }
}
