import { CreateProductDto } from './dto/create-product.dto';
import { Entity } from '@app/core';
import { ProductInterface } from '@app/types/product.interface';

export class ProductEntity
  implements ProductInterface, Entity<string, ProductInterface>
{
  public id?: string;
  public name: string;
  public description: string;
  public photo: string;
  public type: string;
  public article: string;
  public strings: number;
  public price: number;
  public createdAt?: Date;
  public updatedAt?: Date;

  public populate(data: ProductInterface): ProductEntity {
    this.id = data.id ?? undefined;
    this.name = data.name;
    this.description = data.description;
    this.photo = data.photo;
    this.type = data.type;
    this.article = data.article;
    this.strings = data.strings;
    this.price = data.price;
    this.createdAt = data.createdAt ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;

    return this;
  }

  public toPOJO(): ProductInterface {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      photo: this.photo,
      type: this.type,
      article: this.article,
      strings: this.strings,
      price: this.price,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static fromObject(data: ProductInterface): ProductEntity {
    return new ProductEntity().populate(data);
  }

  static fromDto(dto: CreateProductDto): ProductEntity {
    const entity = new ProductEntity();
    entity.name = dto.name;
    entity.description = dto.description;
    entity.photo = dto.photo;
    entity.type = dto.type;
    entity.article = dto.article;
    entity.strings = dto.strings;
    entity.price = dto.price;

    return entity;
  }
}
