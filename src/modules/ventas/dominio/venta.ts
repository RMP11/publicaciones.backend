import { CreateVentaProps } from './interfaces/create-venta-props';
import { VentaDetalle } from './venta-detalle';
export class Venta {
  private constructor(
    public cliente: string,
    public total: number,
    public descuento: number,
    public fecha: Date,
    public empleadoId: number,
    public sucursalId: number,
    public ventaDetalles: VentaDetalle[],
    public usuarioCreadorId: number,
    public usuarioActualizadorId: number,
  ) {}

  public static create({
    cliente,
    total,
    descuento,
    empleadoId,
    sucursalId,
    usuarioCreadorId,
    usuarioActualizadorId,
    ventaDetalles,
  }: CreateVentaProps): Venta {
    const fechaActual = new Date();

    // 🛡️ Invariantes del dominio
    if (!cliente || cliente.trim() === '') {
      throw new Error('El cliente es requerido');
    }

    if (total < 0) {
      throw new Error('El total no puede ser negativo');
    }

    if (descuento < 0) {
      throw new Error('El descuento no puede ser negativo');
    }

    if (descuento > total) {
      throw new Error('El descuento no puede ser mayor al total');
    }

    if (!ventaDetalles || ventaDetalles.length === 0) {
      throw new Error('La venta debe tener al menos un detalle');
    }

    if (!empleadoId) {
      throw new Error('ID del empleado inválido');
    }

    if (sucursalId <= 0) {
      throw new Error('ID de la sucursal inválido');
    }

    if (!usuarioCreadorId || !usuarioActualizadorId) {
      throw new Error('ID de usuario inválido');
    }

    const ventaDetallesDominio = ventaDetalles.map((vd) =>
      VentaDetalle.create({
        cantidad: vd.cantidad,
        precioUnitario: vd.precioUnitario,
        productoId: vd.productoId,
        usuarioActualizadorId: usuarioActualizadorId,
        usuarioCreadorId: usuarioCreadorId,
      }),
    );

    const venta = new this(
      cliente,
      total,
      descuento,
      fechaActual,
      empleadoId,
      sucursalId,
      ventaDetallesDominio,
      usuarioCreadorId,
      usuarioActualizadorId,
    );

    return venta;
  }
}
