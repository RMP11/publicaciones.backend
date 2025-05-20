export class Producto {
  private constructor(
    public codigo: string,
    public codigoTienda: string,
    public codigoReferencia: string,
    public descripcion: string,
    public unidad: string,
    public marca: string,
    public precioCompra: number,
    public precioVenta: number,
    public alertaStockBajo: number,
    public imagen: string,
    public beneficio: number,
    public medidas: string,
    public usuarioCreadorId: number,
    public usuarioActualizadorId: number,
  ) {}

  public static create() {
    return {};
  }
}
