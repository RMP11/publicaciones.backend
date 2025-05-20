import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function permisosSeeder() {
  console.log('Seeding permisos...');

  const data = [
    { nombre: 'Super Admin', usuarioCreadorId: 0, usuarioActualizadorId: 0 },
    { nombre: 'admin', usuarioCreadorId: 0, usuarioActualizadorId: 0 },
  ];

  await prisma.permiso.createMany({
    data,
  });

  console.log('Seeding de permisos terminado.');
}
