import { Sucursal } from './sucursales';

export interface SucursalRepository {
  findAll(): Promise<Sucursal[]>;
}

export const sucursalRepositoryDefinition = {
  name: 'SucursalRepository',
};
