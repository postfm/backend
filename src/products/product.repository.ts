import { BasePostgresRepository } from '@app/core';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductEntity } from './product.entity';
import { ProductInterface } from '@app/types/product.interface';
import { PrismaClientService } from '@app/models';
import { Prisma } from '@prisma/client';
import { ProductQuery } from './query/product.query';
import { PaginationResult } from '@app/types';
import {
  DEFAULT_SORTING_TYPE,
  DEFAULT_SORT_DIRECTION,
} from './product.constants';

@Injectable()
export class ProductRepository extends BasePostgresRepository<
  ProductEntity,
  ProductInterface
> {
  constructor(protected readonly client: PrismaClientService) {
    super(client, ProductEntity.fromObject);
  }

  private async getProductsCount(
    where: Prisma.ProductsWhereInput,
  ): Promise<number> {
    return this.client.products.count({ where });
  }

  private calculateProductsPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }

  public async save(entity: ProductEntity): Promise<ProductEntity> {
    const pojoEntity = entity.toPOJO();
    const record = await this.client.products.create({
      data: {
        ...pojoEntity,
      },
    });

    entity.id = record.id;
    return entity;
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.products.delete({
      where: {
        id,
      },
    });
  }

  public async findById(id: string): Promise<ProductEntity> {
    const document = await this.client.products.findFirst({
      where: {
        id,
      },
    });

    if (!document) {
      throw new NotFoundException(`Post with id ${id} not found.`);
    }

    return this.createEntityFromDocument(document);
  }

  public async update(
    id: string,
    entity: ProductEntity,
  ): Promise<ProductEntity> {
    const pojoEntity = entity.toPOJO();
    const updatedPost = await this.client.products.update({
      where: { id },
      data: {
        name: pojoEntity.name,
        description: pojoEntity.description,
        photo: pojoEntity.photo,
        type: pojoEntity.type,
        article: pojoEntity.article,
        strings: pojoEntity.strings,
        price: pojoEntity.price,
      },
    });

    return this.createEntityFromDocument(updatedPost);
  }

  public async find(
    query?: ProductQuery,
  ): Promise<PaginationResult<ProductEntity>> {
    const skip =
      query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit;
    const where: Prisma.ProductsWhereInput = {};
    const orderBy: Prisma.ProductsOrderByWithRelationInput = {};
    const sortingType = query?.sortingType
      ? query.sortingType
      : DEFAULT_SORTING_TYPE;
    const sortDirection = query?.sortDirection
      ? query.sortDirection
      : DEFAULT_SORT_DIRECTION;

    orderBy[sortingType] = sortDirection;

    if (query?.filterType) {
      where.type = { in: [...query.filterType.split(',')] };
      console.log(where.type);
    }

    if (query?.filterStrings) {
      where.strings = {
        in: [...query.filterStrings.split(',').map((item) => +item)],
      };
    }

    const [records, postCount] = await Promise.all([
      this.client.products.findMany({
        where,
        orderBy,
        skip,
        take,
      }),
      this.getProductsCount(where),
    ]);

    return {
      entities: records.map((record) => this.createEntityFromDocument(record)),
      currentPage: query?.page,
      totalPages: this.calculateProductsPage(postCount, take),
      itemsPerPage: take,
      totalItems: postCount,
    };
  }
}
