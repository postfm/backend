import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsString()
  @IsNotEmpty()
  photo?: string;

  @IsString()
  @IsNotEmpty()
  type?: string;

  @IsString()
  @IsNotEmpty()
  article?: string;

  @IsNumber()
  @IsNotEmpty()
  strings?: number;

  @IsNumber()
  @IsNotEmpty()
  price?: number;
}
