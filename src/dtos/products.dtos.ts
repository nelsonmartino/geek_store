import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsUrl,
  IsPositive,
} from 'class-validator';

import { PartialType } from '@nestjs/mapped-types';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly price: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly stock: number;

  @IsNotEmpty()
  @IsUrl()
  readonly image: string;
}

//Extiendo las propiedades de CreateProductDto en forma opcional
export class UpdateProductDto extends PartialType(CreateProductDto) {}
