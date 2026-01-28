import { Inject } from '@nestjs/common';
import {
  ProductoRepository,
  productoRepositoryDefinition,
} from '../../dominio/producto.repository';
import { Producto } from '../../dominio/producto';

export class ObtenerProductos {
  public constructor(
    @Inject(productoRepositoryDefinition.name)
    private readonly productRepository: ProductoRepository,
  ) {}

  public async execute(): Promise<Producto[]> {
    const productos = await this.productRepository.findAll();

    return productos;
  }
}
