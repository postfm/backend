import { ProductRdo } from './product.rdo';
import { Expose } from 'class-transformer';

export class ProductWithPaginationRdo {
  @Expose()
  public entities: ProductRdo[];

  @Expose()
  public totalPages: number;

  @Expose()
  public totalItems: number;

  @Expose()
  public currentPage: number;

  @Expose()
  public itemsPerPage: number;
}
