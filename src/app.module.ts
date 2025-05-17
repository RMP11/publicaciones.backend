import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { validate } from '../env.validation';
import { PublicacionesModule } from './modules/publicaciones/publicaciones.module';
import { SeguridadModule } from './modules/seguridad/seguridad.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
    }),
    SeguridadModule,
    PublicacionesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
