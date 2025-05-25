export class Almacen {
  private constructor(
    public readonly id: number,
    public nombre: string,
    public direccion: string,
    public telefono: string,
    public sucursalId: number,
    public usuarioCreadorId: number,
    public usuarioActualizadorId: number,
  ) {}

  public static create({
    id,
    nombre,
    direccion,
    telefono,
    sucursalId,
    usuarioCreadorId,
    usuarioActualizadorId,
  }: any): Almacen {
    // 🛡️ Invariantes del dominio
    if (!nombre) throw new Error('El nombre del almacén es obligatorio');
    if (!direccion) throw new Error('La dirección del almacén es obligatoria');
    if (!telefono) throw new Error('El teléfono del almacén es obligatorio');
    if (sucursalId <= 0) throw new Error('ID de sucursal inválido');
    if (usuarioCreadorId <= 0 || usuarioActualizadorId <= 0) {
      throw new Error('ID de usuario inválido');
    }

    return new this(
      id,
      nombre,
      direccion,
      telefono,
      sucursalId,
      usuarioCreadorId,
      usuarioActualizadorId,
    );
  }
}
