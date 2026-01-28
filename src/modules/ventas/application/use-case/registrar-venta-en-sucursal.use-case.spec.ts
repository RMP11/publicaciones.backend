import { Test, TestingModule } from '@nestjs/testing';
import { RegistrarVentaEnSucursal } from './registrar-venta-en-sucursal.use-case';
import { CreateVentaDto } from '../../infraestructure/dtos/crear-venta.dto';
import { BadRequestException } from '@nestjs/common';
import { ventaRepositoryDefinition } from '../../dominio/venta.repository';

describe('RegistrarVentaEnSucursal (Integración)', () => {
  let registrarVenta: RegistrarVentaEnSucursal;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        RegistrarVentaEnSucursal,
        {
          provide: ventaRepositoryDefinition.name,
          // Mock
          useValue: {
            create: jest.fn().mockReturnValue({ id: 1 }),
          },
        },
      ],
    }).compile();

    registrarVenta = moduleRef.get<RegistrarVentaEnSucursal>(
      RegistrarVentaEnSucursal,
    );
  });

  it('CN01 - debería registrar una venta válida en la sucursal con id 1', async () => {
    // Arrange
    const dto: CreateVentaDto = {
      cliente: 'Juan',
      total: 0,
      descuento: 0,
      sucursalId: 1,
      ventaDetalles: [
        {
          productoId: 1,
          cantidad: 2,
          precioUnitario: 50,
        },
      ],
    };

    const usuario: any = {
      id: 101,
      correo: 'test@example.com',
      empleado: { id: 501 },
    };

    // Act
    const ventaGuardada = await registrarVenta.execute(dto, usuario);

    // Assert
    expect(ventaGuardada).toBeDefined();
  });

  it('CN02 - debería lanzar BadRequestException si los datos son inválidos', async () => {
    // Arrange
    const dtoInvalido: CreateVentaDto = {
      cliente: 'Juan',
      total: 0,
      descuento: 0,
      sucursalId: 0,
      ventaDetalles: [
        {
          productoId: 1,
          cantidad: 2,
          precioUnitario: 50,
        },
      ],
    };

    const usuario: any = {
      id: 102,
      email: 'test2@example.com',
      empleado: { id: 502 },
    };

    // Act & Assert
    await expect(registrarVenta.execute(dtoInvalido, usuario)).rejects.toThrow(
      BadRequestException,
    );
  });
});
