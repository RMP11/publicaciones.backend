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
  }: any): Venta {
    const fechaActual = new Date();

    const venta = new this(
      cliente,
      total,
      descuento,
      fechaActual,
      empleadoId,
      sucursalId,
      ventaDetalles,
      usuarioCreadorId,
      usuarioActualizadorId,
    );

    return venta;
  }
}
