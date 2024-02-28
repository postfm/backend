import { Transform } from 'class-transformer';
import { IsArray, IsIn, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { SortDirection } from '@app/types';
import { DefaultValue } from '../product.constants';

export class ProductQuery {
  @Transform(({ value }) => +value || DefaultValue.PostCountLimit)
  @IsNumber()
  @IsOptional()
  public limit = DefaultValue.PostCountLimit;

  @IsUUID('all', { each: true })
  @IsArray()
  @IsOptional()
  public categories?: string[];

  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection: SortDirection;

  @Transform(({ value }) => +value || DefaultValue.PageCount)
  @IsOptional()
  public page: number = DefaultValue.PageCount;

  @IsOptional()
  public sortingType: string;

  @IsOptional()
  public filterType: string;

  @IsOptional()
  public filterStrings: string;
}
