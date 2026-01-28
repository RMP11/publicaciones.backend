export class Precio {
  constructor(readonly monto: number) {
    if (monto < 0) throw new Error('El precio no puede ser negativo');
  }
}
