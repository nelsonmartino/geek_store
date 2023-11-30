import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  Res, //Para manejar errores con el motor de Express (ver video 13 del curso para completar)
  // ParseIntPipe //Para verificar que lo que se recibe es un número
} from '@nestjs/common';

import { Response } from 'express'; //Para manejar errores con el motor de Express (ver video 13 del curso para completar)

import { ParseIntPipe } from '../common/parse-int.pipe'; //En lugar de usar el que viene por defecto creo una para practicar

import { ProductsService } from '../services/products.service';

import { CreateProductDto, UpdateProductDto } from '../dtos/products.dtos';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  //*Recibiendo información por params
  // @Get('products/:id') // sin importar las /, puedo acceder a esta nueva ruta como http://localhost:3000/otra_ruta
  // getProduct(@Param() params:any): string {
  //   return `Product ${params.id}`;
  // }

  //*Recibiendo parámetros por query
  @Get()
  getProducts(@Query() values: any) {
    // const { limit, offset } = values;
    return this.productsService.findAll();
    // return `Pagination limit:${limit} and offset:${offset}`;
  }

  // //*Puedo recibir por query especificando los parámetros a recibir
  // @Get('2')
  // getProducts2(
  //   @Query('limit') limit: number = 100, //*De esta manera puedo asignar un valor por defecto en caso de no recibirlo. En este caso "number" no es necesario
  //   @Query('offset') offset: number,
  //   @Query('brand') brand: number,
  // ) {
  //   // return `Pagination limit:${limit}, offset:${offset} and brand:${brand}`;
  //   return this.productsService.findAll();
  // }

  //*Simplificando la recepción de parametros y especificando el parátro a recibir
  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED) //Con esto defino el estado con el que quiero responder
  getProduct(@Param('id', ParseIntPipe) id: number) {
    // return `Product ${id}`;
    return this.productsService.findOne(+id);
  }

  // *Metodo post (crear)
  @Post()
  create(@Body() payload: CreateProductDto) {

    // return {
    //   message: 'Create action',
    //   payload,
    // };
    return this.productsService.create(payload);
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
  update(@Param('id') id: string, @Body() payload: UpdateProductDto) {
    // return {
    //   id,
    //   payload,
    // };
    return this.productsService.update(+id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productsService.delete(+id); // Se usa + para pasar de string a número
  }
}

//! Manejo de errores
