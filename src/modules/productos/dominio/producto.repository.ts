import { Producto } from './producto';

export interface ProductoRepository {
  findAll(): Promise<Producto[]>;
}

export const productoRepositoryDefinition = {
  name: 'ProductoRepository',
};
