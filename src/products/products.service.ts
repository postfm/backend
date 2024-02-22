import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { ProductQuery } from './query/product.query';
import { PaginationResult } from '@app/types';
import { ProductEntity } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductRepository) {}

  public async getAllProducts(
    query?: ProductQuery,
  ): Promise<PaginationResult<ProductEntity>> {
    const productsWithPagination = this.productRepository.find(query);
    const result = {
      ...productsWithPagination,
      entities: (await productsWithPagination).entities.map((product) =>
        product.toPOJO(),
      ),
    };

    return result;
  }

  public async createProducts(dto: CreateProductDto): Promise<ProductEntity> {
    const newPost = ProductEntity.fromDto(dto);
    await this.productRepository.save(newPost);

    return newPost;
  }

  public async deleteProduct(id: string): Promise<void> {
    try {
      await this.productRepository.deleteById(id);
    } catch {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
  }

  public async getProduct(id: string): Promise<ProductEntity> {
    return this.productRepository.findById(id);
  }

  public async updateProduct(
    id: string,
    dto: UpdateProductDto,
  ): Promise<ProductEntity> {
    const existsProduct = await this.productRepository.findById(id);
    let hasChanges = false;

    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined && existsProduct[key] !== value) {
        existsProduct[key] = value;
        hasChanges = true;
      }
    }

    if (!hasChanges) {
      return existsProduct;
    }

    return this.productRepository.update(id, existsProduct);
  }
}
