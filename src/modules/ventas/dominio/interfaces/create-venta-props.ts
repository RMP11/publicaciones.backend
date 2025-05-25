import { VentaDetalleDto } from '../../infraestructure/dtos/venta-detalle.dto';

export interface CreateVentaProps {
  cliente: string;
  total: number;
  descuento: number;
  empleadoId?: number;
  sucursalId: number;
  usuarioCreadorId?: number;
  usuarioActualizadorId?: number;
  ventaDetalles: VentaDetalleDto[];
}
