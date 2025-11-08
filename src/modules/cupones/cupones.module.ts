import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CuponesService } from './cupones.service';
import { CuponesController } from './cupones.controller';

@Module({
  imports: [
    HttpModule.register({
      baseURL: process.env.URL_BASE_CUPONES,
    }),
  ],
  controllers: [CuponesController],
  providers: [CuponesService],
})
export class CuponesModule {}
