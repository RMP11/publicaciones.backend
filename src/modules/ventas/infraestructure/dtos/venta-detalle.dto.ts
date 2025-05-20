import { IsInt, IsNumber, IsPositive } from 'class-validator';

export class VentaDetalleDto {
  @IsInt()
  @IsPositive()
  cantidad: number;

  @IsNumber()
  @IsPositive()
  precioUnitario: number;

  @IsInt()
  @IsPositive()
  productoId: number;
}
