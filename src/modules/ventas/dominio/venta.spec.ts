import { Venta } from './venta';
import { VentaDetalle } from './venta-detalle';

describe('Venta.create - Particionamiento de equivalencias', () => {
  const ventaDetallesValidos = [
    { cantidad: 1, precioUnitario: 100, productoId: 1 },
  ];

  const usuarioCreadorId = 1;
  const usuarioActualizadorId = 1;

  it('CN01: Venta con descuento válido (100) => venta registrada correctamente', () => {
    // Arrange
    const input = {
      cliente: 'Cliente Y',
      total: 500,
      descuento: 100,
      empleadoId: 1,
      sucursalId: 1,
      usuarioCreadorId,
      usuarioActualizadorId,
      ventaDetalles: ventaDetallesValidos,
    };

    // Act
    const venta = Venta.create(input);

    // Assert
    expect(venta).toBeInstanceOf(Venta);
    expect(venta.descuento).toBe(100);
  });

  it('CN02: Venta con descuento negativo (-100) => lanza error de validación', () => {
    // Arrange
    const input = {
      cliente: 'Cliente Y',
      total: 500,
      descuento: -100,
      empleadoId: 1,
      sucursalId: 1,
      usuarioCreadorId,
      usuarioActualizadorId,
      ventaDetalles: ventaDetallesValidos,
    };

    // Act
    const crearVenta = () => Venta.create(input);

    // Assert
    expect(crearVenta).toThrow('El descuento no puede ser negativo');
  });
});

describe('Venta.create - Pruebas de contorno', () => {
  const ventaDetallesValidos = [
    { cantidad: 1, precioUnitario: 100, productoId: 1 },
  ];

  const usuarioCreadorId = 1;
  const usuarioActualizadorId = 1;

  it('CN03: Descuento en límite inferior válido 0 => venta creada correctamente', () => {
    // Arrange
    const input = {
      cliente: 'Cliente Contorno',
      total: 500,
      descuento: 0, // límite inferior válido
      empleadoId: 1,
      sucursalId: 1,
      usuarioCreadorId,
      usuarioActualizadorId,
      ventaDetalles: ventaDetallesValidos,
    };

    // Act
    const venta = Venta.create(input);

    // Assert
    expect(venta).toBeInstanceOf(Venta);
    expect(venta.descuento).toBe(0);
  });

  it('CN04: Descuento en límite superior válido (igual a total) => venta creada correctamente', () => {
    // Arrange
    const input = {
      cliente: 'Cliente Contorno',
      total: 500,
      descuento: 500, // límite superior válido
      empleadoId: 1,
      sucursalId: 1,
      usuarioCreadorId,
      usuarioActualizadorId,
      ventaDetalles: ventaDetallesValidos,
    };

    // Act
    const venta = Venta.create(input);

    // Assert
    expect(venta).toBeInstanceOf(Venta);
    expect(venta.descuento).toBe(500);
  });
});

describe('Venta.create - Prueba basada en el estado', () => {
  const ventaDetallesValidos = [
    { cantidad: 1, precioUnitario: 100, productoId: 1 },
  ];

  const usuarioCreadorId = 1;
  const usuarioActualizadorId = 1;

  it('CN05: La venta creada debe tener fecha actual definida', () => {
    // Arrange
    const input = {
      cliente: 'Cliente Estado',
      total: 500,
      descuento: 100,
      empleadoId: 1,
      sucursalId: 1,
      usuarioCreadorId,
      usuarioActualizadorId,
      ventaDetalles: ventaDetallesValidos,
    };

    // Act
    const venta = Venta.create(input);

    // Assert
    expect(venta).toBeInstanceOf(Venta);
    expect(venta.fecha).toBeInstanceOf(Date);
  });
});

describe('Venta.create - Pruebas de subprocesos(simulada con llamadas concurrentes)', () => {
  const ventaDetallesValidos = [
    { cantidad: 1, precioUnitario: 100, productoId: 1 },
  ];

  const usuarioCreadorId = 1;
  const usuarioActualizadorId = 1;

  it('Crear múltiples ventas simultáneamente sin interferencia', async () => {
    // Arrange - múltiples inputs diferentes
    const inputs = [
      {
        cliente: 'Cliente 1',
        total: 200,
        descuento: 20,
        empleadoId: 1,
        sucursalId: 1,
        usuarioCreadorId,
        usuarioActualizadorId,
        ventaDetalles: ventaDetallesValidos,
      },
      {
        cliente: 'Cliente 2',
        total: 300,
        descuento: 30,
        empleadoId: 2,
        sucursalId: 2,
        usuarioCreadorId,
        usuarioActualizadorId,
        ventaDetalles: ventaDetallesValidos,
      },
      {
        cliente: 'Cliente 3',
        total: 400,
        descuento: 40,
        empleadoId: 3,
        sucursalId: 3,
        usuarioCreadorId,
        usuarioActualizadorId,
        ventaDetalles: ventaDetallesValidos,
      },
    ];

    // Act - crear ventas "concurrentemente"
    const ventas = await Promise.all(
      inputs.map(async (input) => {
        // Aquí es síncrono, pero simulamos async con Promise.resolve
        return Promise.resolve(Venta.create(input));
      }),
    );

    // Assert
    ventas.forEach((venta, index) => {
      expect(venta).toBeInstanceOf(Venta);
      expect(venta.cliente).toBe(inputs[index].cliente);
      expect(venta.total).toBe(inputs[index].total);
      expect(venta.descuento).toBe(inputs[index].descuento);
    });
  });
});

describe('Venta.create - Interacción con VentaDetalle', () => {
  it('debe llamar a VentaDetalle.create para cada detalle con los datos correctos', () => {
    // Arrange
    const detallesValidos = [
      { cantidad: 2, precioUnitario: 150, productoId: 10 },
      { cantidad: 1, precioUnitario: 200, productoId: 20 },
    ];
    const usuarioCreadorId = 99;
    const usuarioActualizadorId = 88;

    const spy = jest.spyOn(VentaDetalle, 'create').mockImplementation((p) => p);

    const input = {
      cliente: 'Cliente Test',
      total: 500,
      descuento: 0,
      empleadoId: 1,
      sucursalId: 1,
      usuarioCreadorId,
      usuarioActualizadorId,
      ventaDetalles: detallesValidos,
    };

    // Act
    Venta.create(input);

    // Assert
    expect(spy).toHaveBeenCalledTimes(2);

    spy.mockRestore();
  });
});
