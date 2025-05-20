import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function usuarioSeeder() {
  console.log('Seeding usuarios...');

  await prisma.usuario.create({
    data: {
      correo: 'admin@fake.com',
      contrasena:
        '$2b$10$s5ihrurtiPgvq3MBKlKzYuBW956FpUvgT1FtJxPs.f3Sfwo.xaT4i',
      nombre: 'Juan Perez',
      usuarioCreadorId: 0,
      usuarioActualizadorId: 0,
    },
  });

  console.log('Seeding de usuarios terminado.');
}
