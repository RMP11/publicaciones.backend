import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsPositive,
  IsArray,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { VentaDetalleDto } from './venta-detalle.dto';
import { Type } from 'class-transformer';

export class CreateVentaDto {
  @ApiProperty({ example: 'Ejemplo' })
  @IsString()
  cliente: string;

  @ApiProperty({ example: 100 })
  @IsNumber()
  total: number;

  @ApiProperty({ example: 100 })
  @IsNumber()
  descuento: number;

  @ApiProperty({ example: 1 })
  @IsPositive()
  sucursalId: number;

  @ApiProperty()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => VentaDetalleDto)
  ventaDetalles: VentaDetalleDto[];
}
