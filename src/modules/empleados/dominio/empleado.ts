export class Empleado {
  private constructor(
    public readonly id: number,
    public nombre: string,
    public usuarioCreadorId: number,
    public usuarioActualizadorId: number,
  ) {}

  public static create({
    id,
    nombre,
    usuarioCreadorId,
    usuarioActualizadorId,
  }: any): Empleado {
    return new this(id, nombre, usuarioCreadorId, usuarioActualizadorId);
  }
}
