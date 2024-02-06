import { Expose } from 'class-transformer';

export class ProductRdo {
  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  photo: string;

  @Expose()
  type: string;

  @Expose()
  article: string;

  @Expose()
  strings: number;

  @Expose()
  price: number;
}
