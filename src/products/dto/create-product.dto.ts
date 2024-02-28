import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { GuitarStrings, GuitarType } from '../product.types';
import { GUITAR_TYPE, STRINGS } from '../product.constants';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(10, { message: 'Minimum name length no less than 10 characters' })
  @MaxLength(100, {
    message: 'Maximum name length no more than 100 characters',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(20, { message: 'Minimum name length no less than 20 characters' })
  @MaxLength(1024, {
    message: 'Maximum name length no more than 1024 characters',
  })
  description: string;

  @IsString()
  @IsNotEmpty()
  photo: string;

  @IsString()
  @IsNotEmpty()
  @IsString()
  @IsIn(GUITAR_TYPE)
  type: GuitarType;

  @IsString()
  @IsNotEmpty()
  @MinLength(5, { message: 'Minimum name length no less than 5 characters' })
  @MaxLength(40, {
    message: 'Maximum name length no more than 40 characters',
  })
  article: string;

  @IsNumber()
  @IsNotEmpty()
  @IsNumber()
  @IsIn(STRINGS)
  strings: GuitarStrings;

  @IsNumber()
  @IsNotEmpty()
  @Min(100, { message: 'Minimum price no less than 100' })
  @Max(1000000, { message: 'Maximum price no more than 1 000 000' })
  price: number;
}
