import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { validate } from '../env.validation';
import { PublicacionesModule } from './modules/publicaciones/publicaciones.module';
import { SeguridadModule } from './modules/seguridad/seguridad.module';
import { PrismaModule } from './prisma/prisma.module';
import { VentasModule } from './modules/ventas/infraestructure/ventas.module';
import { ProductosModulo } from './modules/productos/infraestructure/productos.module';
import { SucursalesModule } from './modules/unidad-operativa/sucursales/infraestructure/sucursales.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
    }),
    PrismaModule,
    SeguridadModule,
    PublicacionesModule,
    VentasModule,
    ProductosModulo,
    SucursalesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
