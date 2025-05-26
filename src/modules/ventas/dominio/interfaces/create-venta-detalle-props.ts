import { Precio } from '../precio';

export interface CreateVentaDetalleProps {
  cantidad: number;
  readonly precioUnitario: Precio;
  productoId: number;
  usuarioCreadorId: number;
  usuarioActualizadorId: number;
}
