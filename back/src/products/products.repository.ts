import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import * as data from '../utils/Archivo.json';
import { Category } from 'src/categories/entities/category.entity';
import { BadRequestException } from '@nestjs/common';

export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  getProducts() {
    return this.productsRepository.find();
  }
  async addProducts() {
    const categories = await this.categoriesRepository.find();
    data?.map(async (element) => {
      const category = categories.find(
        (category) => category.category_name === element.category,
      );

      const product = new Product();
      product.product_name = element.product_name;
      product.description = element.description;
      product.price = element.price;
      product.available = element.available;
      product.image_url =
        element.image_url.length !== 0
          ? element.image_url
          : 'https://res.cloudinary.com/dxpxzcj2i/image/upload/v1724243935/gvmpxhbyz3rvdsvnhvhm.webp';
      product.category = category;

      await this.productsRepository
        .createQueryBuilder()
        .insert()
        .into(Product)
        .values(product)
        .orUpdate(['description', 'price'], ['product_name'])
        .execute();
    });
    return 'Products added';
    // return 'this.products';
  }

  async create(createProductDto: any) {
    const product = await this.productsRepository.findOne({
      where: { product_name: createProductDto.product_name },
    });
    if (product) throw new BadRequestException('Product already exists');
    return this.productsRepository.save(createProductDto);
  }

  async findOne(product_id: string) {
    return await this.productsRepository.findOne({
      where: { product_id },
    });
  }
  async update(product_id: string, updateProductDto: any) {
    await this.productsRepository.update(product_id, updateProductDto);
    const product = await this.findOne(product_id);
    return product;
  }
  remove(id: number) {
    throw new Error('Method not implemented.');
  }
}
