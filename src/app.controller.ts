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

  //*Recibiendo información por params
  // @Get('products/:id') // sin importar las /, puedo acceder a esta nueva ruta como http://localhost:3000/otra_ruta
  // getProduct(@Param() params:any): string {
  //   return `Product ${params.id}`;
  // }

  //*Simplificando la recepción de parametros y especificando el parátro a recibir
  @Get('products/:id')
  getProduct(@Param('id') id: string): string {
    return `Product ${id}`;
  }

  //*Recibiendo más de un parámetro en la misma ruta
  @Get('categories/:id/products/:productId')
  getProduct2(
    @Param('id') id: string,
    @Param('productId') productId: string,
  ): string {
    return `Product ${id} and ${productId}`;
  }

  //*Recibiendo parámetros por query
  @Get('products')
  getProducts(@Query() values: any): string {
    const { limit, offset } = values;
    return `Pagination limit:${limit} and offset:${offset}`;
  }

  //*Puedo recibir por query especificando los parámetros a recibir
  @Get('products2')
  getProducts2(
    @Query('limit') limit: number = 100, //*De esta manera puedo asignar un valor por defecto en caso de no recibirlo. En este caso "number" no es necesario
    @Query('offset') offset: number,
    @Query('brand') brand: number,
  ): string {
    return `Pagination limit:${limit}, offset:${offset} and brand:${brand}`;
  }
}

//!Separación de responsabilidades