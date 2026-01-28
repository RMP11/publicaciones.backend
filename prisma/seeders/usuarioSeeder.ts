import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function usuarioSeeder() {
  console.log('Seeding usuarios...');

  const data = {
      correo: 'admin@fake.com',
      contrasena:
        '$2b$10$s5ihrurtiPgvq3MBKlKzYuBW956FpUvgT1FtJxPs.f3Sfwo.xaT4i',
      nombre: 'Juan Perez',
      usuarioCreadorId: 0,
      usuarioActualizadorId: 0,
    }

  const usuario = await prisma.usuario.upsert({
    where: { correo: 'admin@fake.com'},
    create: data,
    update: data
  });
  
  const empleado = {
          nombre: 'Perez',
          usuarioActualizadorId: 0,
          usuarioCreadorId: 0,
          usuarioId: usuario.id
        }

  await prisma.empleado.upsert({
    where: { usuarioId: usuario.id},
    create: empleado,
    update: empleado
  });

  

  console.log('Seeding de usuarios terminado.');
}
