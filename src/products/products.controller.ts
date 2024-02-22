import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { fillDto } from '@app/helpers';
import { ProductRdo } from './rdo/product.rdo';
import { ProductQuery } from './query/product.query';
import { ProductWithPaginationRdo } from './rdo/product-with-pagination.rdo';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/:id')
  public async show(@Param('id') id: string) {
    const product = await this.productsService.getProduct(id);
    return fillDto(ProductRdo, product.toPOJO());
  }

  @Get('/')
  public async index(@Query() query: ProductQuery) {
    const productsWithPagination =
      await this.productsService.getAllProducts(query);
    return fillDto(ProductWithPaginationRdo, productsWithPagination);
  }

  @Post('/')
  public async create(@Body() dto: CreateProductDto) {
    const newProduct = await this.productsService.createProducts(dto);
    return fillDto(ProductRdo, newProduct.toPOJO());
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async destroy(@Param('id') id: string) {
    await this.productsService.deleteProduct(id);
  }

  @Patch('/:id')
  public async update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    const updatedPost = await this.productsService.updateProduct(id, dto);
    return fillDto(ProductRdo, updatedPost.toPOJO());
  }
}
