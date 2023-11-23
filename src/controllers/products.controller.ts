import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  //*Recibiendo información por params
  // @Get('products/:id') // sin importar las /, puedo acceder a esta nueva ruta como http://localhost:3000/otra_ruta
  // getProduct(@Param() params:any): string {
  //   return `Product ${params.id}`;
  // }

  //*Recibiendo parámetros por query
  @Get()
  getProducts(@Query() values: any): string {
    const { limit, offset } = values;
    return `Pagination limit:${limit} and offset:${offset}`;
  }

  //*Puedo recibir por query especificando los parámetros a recibir
  @Get('2')
  getProducts2(
    @Query('limit') limit: number = 100, //*De esta manera puedo asignar un valor por defecto en caso de no recibirlo. En este caso "number" no es necesario
    @Query('offset') offset: number,
    @Query('brand') brand: number,
  ): string {
    return `Pagination limit:${limit}, offset:${offset} and brand:${brand}`;
  }

  //*Simplificando la recepción de parametros y especificando el parátro a recibir
  @Get(':id')
  getProduct(@Param('id') id: string): string {
    return `Product ${id}`;
  }

  // *Metodo post (crear)
  @Post()
  create(@Body() payload: any) {
    return {
      message: 'Create action',
      payload,
    };
  }

  //*Tambien puedo especificar qué parámetros recibir y con qué formato
  // @Post()
  // create(@Body('name') name: string, @Body('age') age: number) {
  //   return {
  //     message: 'Create action',
  //     name,
  //     age,
  //   };
  // }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return {
      id,
      payload,
    };
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return id;
  }
}

//! Codigos de estado