import { Controller, Get, Param } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  //*Recibiendo más de un parámetro en la misma ruta
  @Get(':id/products/:productId')
  getProduct2(
    @Param('id') id: string,
    @Param('productId') productId: string,
  ): string {
    return `Product ${id} and ${productId}`;
  }
}
