import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository';
import { CategoriesRepository } from 'src/categories/categories.repository';

@Injectable()
export class ProductsService implements OnApplicationBootstrap {
  constructor(
    private readonly productRepository: ProductsRepository,
    private readonly categoriesRepository: CategoriesRepository,
  ) {}

  async onApplicationBootstrap() {
    await this.categoriesRepository.preloadCategories();
    await this.productRepository.addProducts();
  }
  add() {
    return this.productRepository.addProducts();
  }
  create(createProductDto: CreateProductDto) {
    return this.productRepository.create(createProductDto);
  }

  findAll() {
    return this.productRepository.getProducts();
  }

  findOne(id: string) {
    return this.productRepository.findOne(id);
  }

  update(product_id: string, updateProductDto: UpdateProductDto) {
    return this.productRepository.update(product_id, updateProductDto);
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
