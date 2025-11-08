// src/cupones/cupones.service.ts
import { Injectable, ServiceUnavailableException, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class CuponesService {
  private failureCount = 0;
  private state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED';
  private nextAttempt = Date.now();

  private readonly failureThreshold = 3; // nº fallos antes de abrir
  private readonly coolDownTime = 10_000; // ms circuito abierto

  constructor(private readonly http: HttpService) {}

  private async requestWithRetry<T>(
    fn: () => Promise<T>,
    retries = 3,
    delay = 300,
  ): Promise<T> {
    try {
      return await fn();
    } catch (err) {
      if (retries <= 0) throw err;

      console.log(`Falló la petición, reintentando... (${retries} restantes)`);

      await new Promise((resolve) => setTimeout(resolve, delay));

      return this.requestWithRetry(fn, retries - 1, delay * 2); // backoff exponencial
    }
  }

  async generar(body: any) {
    return this.requestWithRetry(async () => {
      const res = await this.http.axiosRef.post('cupones', {
        codigo: body.codigo,
        descripcion: body.descripcion,
        tipoDescuento: body.tipoDescuento,
        valorDescuento: body.valorDescuento,
        usosMaximos: body.usosMaximos,
        fechaInicio: new Date(body.fechaInicio),
        fechaFin: body.fechaFin ? new Date(body.fechaFin) : undefined,
      });
      return res.data;
    });
  }

  // CIRCUITBREAKER

  private async circuitBreaker<T>(fn: () => Promise<T>): Promise<T> {
    // Verificar estado actual del circuito
    if (this.state === 'OPEN') {
      if (Date.now() < this.nextAttempt) {
        throw new ServiceUnavailableException(
          'Servicio de cupones temporalmente no disponible (Circuit OPEN)',
        );
      }

      // Se cumplió tiempo → probaremos una sola request
      this.state = 'HALF_OPEN';
    }

    try {
      const result = await fn(); // intentar ejecutar
      this.successHandler();
      return result;
    } catch (error) {
      this.failureHandler();
      throw new BadRequestException(error);
    }
  }

  private successHandler() {
    this.failureCount = 0;
    if (this.state !== 'CLOSED') {
      console.log(
        'Circuito CERRADO nuevamente — el microservicio se recuperó',
      );
    }
    this.state = 'CLOSED';
  }

  private failureHandler() {
    this.failureCount++;

    if (this.failureCount >= this.failureThreshold) {
      this.state = 'OPEN';
      this.nextAttempt = Date.now() + this.coolDownTime;
      console.log('🔴 Circuito ABIERTO — demasiados fallos continuos');
    }
  }

  // === MÉTODO REAL QUE LLAMA A CUPONES ===
  async crearCuponCircuit(dto: any) {
    return this.circuitBreaker(async () => {
      const res = await this.http.axiosRef.post('/cupones', dto);
      return res.data;
    });
  }
}
