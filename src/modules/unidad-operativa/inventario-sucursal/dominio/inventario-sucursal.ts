export class InventarioSucursal {
  private constructor(
    public productoId: number,
    public sucursalId: number,
    public cantidad: number,
    public usuarioCreadorId: number,
    public usuarioActualizadorId: number,
  ) {}

  public static create({
    productoId,
    sucursalId,
    cantidad,
    usuarioCreadorId,
    usuarioActualizadorId,
  }: any): InventarioSucursal {
    // 🛡️ Invariantes del dominio
    if (productoId <= 0) throw new Error('ID de producto inválido');
    if (sucursalId <= 0) throw new Error('ID de sucursal inválido');
    if (cantidad < 0) throw new Error('La cantidad no puede ser negativa');
    if (usuarioCreadorId <= 0 || usuarioActualizadorId <= 0) {
      throw new Error('ID de usuario inválido');
    }

    return new this(
      productoId,
      sucursalId,
      cantidad,
      usuarioCreadorId,
      usuarioActualizadorId,
    );
  }
}
