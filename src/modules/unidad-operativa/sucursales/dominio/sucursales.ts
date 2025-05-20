export class Sucursal {
  private constructor(
    public descripcion: string,
    public esTienda: boolean,
    public usuarioCreadorId: number,
    public usuarioActualizadorId: number,
    public createdAt: string,
    public updatedAt: string,
    public deletedAt: string,
  ) {}
}
