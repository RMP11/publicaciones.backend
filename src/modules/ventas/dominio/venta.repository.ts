import { Venta } from './venta';

export interface VentaRepository {
  create(venta: Venta): Promise<Venta>;
}

export const ventaRepositoryDefinition = {
  name: 'VentaRepository',
};
