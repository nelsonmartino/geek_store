import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsUrl,
  IsEmail,
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

// El signo de interrogación indica que los parámetros son opcionales
// export class UpdateProductDto {
//   readonly name?: string;
//   readonly description?: string;
//   readonly price?: number;
//   readonly stock?: number;
//   readonly image?: string;
// }

//Con PartialType reemplazo lo anterior
export class UpdateProductDto extends PartialType(CreateProductDto) {}
