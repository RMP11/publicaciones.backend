import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function sucursalesSeeder() {
  console.log('Seeding sucursales...');

  await prisma.sucursal.createMany({
    data: [
      {
        descripcion: 'Almacén General',
        esTienda: true,
        usuarioCreadorId: 1,
        usuarioActualizadorId: 1,
        createdAt: '2025-05-20T10:00:00Z',
        updatedAt: '2025-05-20T10:00:00Z',
        deletedAt: null,
      },
      {
        descripcion: 'Oficina Central',
        esTienda: false,
        usuarioCreadorId: 2,
        usuarioActualizadorId: 2,
        createdAt: '2025-05-20T10:00:00Z',
        updatedAt: '2025-05-20T10:00:00Z',
        deletedAt: null,
      },
      {
        descripcion: 'Sucursal Norte',
        esTienda: true,
        usuarioCreadorId: 3,
        usuarioActualizadorId: null,
        createdAt: '2025-05-20T10:00:00Z',
        updatedAt: '2025-05-20T10:00:00Z',
        deletedAt: null,
      },
      {
        descripcion: 'Bodega de Archivo',
        esTienda: false,
        usuarioCreadorId: 4,
        usuarioActualizadorId: 4,
        createdAt: '2025-05-20T10:00:00Z',
        updatedAt: '2025-05-20T10:00:00Z',
        deletedAt: null,
      },
      {
        descripcion: 'Sucursal Sur',
        esTienda: true,
        usuarioCreadorId: 1,
        usuarioActualizadorId: 2,
        createdAt: '2025-05-20T10:00:00Z',
        updatedAt: '2025-05-20T10:00:00Z',
        deletedAt: null,
      },
    ],
  });

  console.log('Seeding de sucursales terminado.');
}
