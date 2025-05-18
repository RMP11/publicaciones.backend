import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function permisosSeeder() {
  console.log('Seeding permisos...');

  const data = [
    { nombre: 'Super Admin', usuarioCreador: 0, usuarioActualizador: 0 },
    { nombre: 'admin', usuarioCreador: 0, usuarioActualizador: 0 },
  ];

  await prisma.permiso.createMany({
    data,
  });

  console.log('Seeding de permisos terminado.');
}
