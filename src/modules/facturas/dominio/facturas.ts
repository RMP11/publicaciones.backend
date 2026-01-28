export class Factura {
  private constructor(
    public readonly numero: string,
    public readonly fecha: Date,
    public clienteId: number,
    public total: number,
    public descuento: number,
    public empleadoId: number,
    public sucursalId: number,
    public usuarioCreadorId: number,
    public usuarioActualizadorId: number,
  ) {}

  public static create({
    numero,
    clienteId,
    total,
    descuento,
    empleadoId,
    sucursalId,
    usuarioCreadorId,
    usuarioActualizadorId,
    detalles,
  }: any): Factura {
    // 🛡️ Invariantes del dominio
    if (!numero) throw new Error('El número de factura es obligatorio');
    if (clienteId <= 0) throw new Error('ID de cliente inválido');
    if (total < 0) throw new Error('El total no puede ser negativo');
    if (descuento < 0) throw new Error('El descuento no puede ser negativo');
    if (empleadoId <= 0) throw new Error('ID de empleado inválido');
    if (sucursalId <= 0) throw new Error('ID de sucursal inválido');
    if (!Array.isArray(detalles) || detalles.length === 0)
      throw new Error('Debe haber al menos un detalle');
    if (usuarioCreadorId <= 0 || usuarioActualizadorId <= 0) {
      throw new Error('ID de usuario inválido');
    }

    const fecha = new Date();

    return new this(
      numero,
      fecha,
      clienteId,
      total,
      descuento,
      empleadoId,
      sucursalId,
      usuarioCreadorId,
      usuarioActualizadorId,
    );
  }
}
