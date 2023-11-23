import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('nueva_ruta') // puedo acceder a esta nueva ruta como http://localhost:3000/nueva_ruta
  newEndpoint(): string {
    return 'Esta es la nueva ruta';
  }

  @Get('/otra_ruta/') // sin importar las /, puedo acceder a esta nueva ruta como http://localhost:3000/otra_ruta
  newEndpoint2(): string {
    return 'Ruta que demuestra que no importan los //';
  }
}