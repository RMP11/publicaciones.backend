import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function permisosSeeder() {
  console.log('Seeding permisos...');

  const permisos = [
    { nombre: 'Super Admin', usuarioCreadorId: 0, usuarioActualizadorId: 0 },
    { nombre: 'admin', usuarioCreadorId: 0, usuarioActualizadorId: 0 },
  ];

  await prisma.$transaction(
    permisos.map((p) =>
      prisma.permiso.upsert({
        where: { nombre: p.nombre },
        create: p,
        update: p,
      })
    )
  );

  console.log('Seeding de permisos terminado.');
}
