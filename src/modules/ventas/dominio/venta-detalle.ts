import { CreateVentaDetalleProps } from './interfaces/create-venta-detalle-props';

export class VentaDetalle {
  private constructor(
    public cantidad: number,
    public precioUnitario: number,
    public productoId: number,
    // public ventaId: number,
    public usuarioCreadorId: number,
    public usuarioActualizadorId: number,
  ) {}

  public static create({
    cantidad,
    precioUnitario,
    productoId,
    usuarioCreadorId,
    usuarioActualizadorId,
  }: CreateVentaDetalleProps): VentaDetalle {
    // 🛡️ Invariantes del dominio
    if (cantidad <= 0) {
      throw new Error('La cantidad debe ser mayor a 0');
    }

    if (precioUnitario < 0) {
      throw new Error('El precio unitario no puede ser negativo');
    }

    if (productoId <= 0) {
      throw new Error('El ID del producto es inválido');
    }

    if (usuarioCreadorId <= 0 || usuarioActualizadorId <= 0) {
      throw new Error('ID de usuario inválido');
    }

    const ventaDetalle = new this(
      cantidad,
      precioUnitario,
      productoId,
      usuarioCreadorId,
      usuarioActualizadorId,
    );

    return ventaDetalle;
  }
}
