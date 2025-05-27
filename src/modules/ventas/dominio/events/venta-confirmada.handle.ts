export class VentaConfirmadaEvent {
  constructor(
    public readonly ventaId: string,
    public readonly clienteId: string,
    public readonly total: number,
    public readonly fechaConfirmacion: Date = new Date(),
  ) {}
}
