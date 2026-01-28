import { PrismaService } from 'src/prisma/prisma.service';
import { Producto } from '../../dominio/producto';
import { ProductoRepository } from '../../dominio/producto.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductoRepositoryImpl implements ProductoRepository {
  constructor(private _prismaService: PrismaService) {}

  async findAll() {
    const respuesta = await this._prismaService.producto.findMany();

    return respuesta as unknown as Producto[];
  }
}
