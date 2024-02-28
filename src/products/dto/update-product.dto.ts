import {
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { GuitarStrings, GuitarType } from '../product.types';
import { GUITAR_TYPE, STRINGS } from '../product.constants';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  @MinLength(10, { message: 'Minimum name length no less than 10 characters' })
  @MaxLength(100, {
    message: 'Maximum name length no more than 100 characters',
  })
  name?: string;

  @IsString()
  @IsOptional()
  @MinLength(20, { message: 'Minimum name length no less than 20 characters' })
  @MaxLength(1024, {
    message: 'Maximum name length no more than 1024 characters',
  })
  description?: string;

  @IsString()
  @IsOptional()
  photo?: string;

  @IsString()
  @IsOptional()
  @IsString()
  @IsIn(GUITAR_TYPE)
  type?: GuitarType;

  @IsString()
  @IsOptional()
  @MinLength(5, { message: 'Minimum name length no less than 5 characters' })
  @MaxLength(40, {
    message: 'Maximum name length no more than 40 characters',
  })
  article?: string;

  @IsNumber()
  @IsOptional()
  @IsNumber()
  @IsIn(STRINGS)
  strings?: GuitarStrings;

  @IsNumber()
  @IsOptional()
  @Min(100, { message: 'Minimum price no less than 100' })
  @Max(1000000, { message: 'Maximum price no more than 1 000 000' })
  price?: number;
}
