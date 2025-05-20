export class VentaDetalle {
  private constructor(
    public cantidad: number,
    public precioUnitario: number,
    public productoId: number,
    public ventaId: number,
    public usuarioCreadorId: number,
    public usuarioActualizadorId: number,
  ) {}

  public static create({
    cantidad,
    precioUnitario,
    productoId,
    ventaId,
    usuarioCreadorId,
    usuarioActualizadorId,
  }: any): VentaDetalle {
    const ventaDetalle = new this(
      cantidad,
      precioUnitario,
      productoId,
      ventaId,
      usuarioCreadorId,
      usuarioActualizadorId,
    );

    return ventaDetalle;
  }
}
