import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import * as data from '../utils/Archivo.json';
import { Category } from 'src/categories/entities/category.entity';

export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    // private readonly categoriesRepository: Repository<Category>,
  ) {}

  getProducts() {
    return 'this.products;';
  }
  async addProducts(createProductDto: any) {
    // const categories = await this.categoriesRepository.find();
    // data?.map(async (element) => {
    //   const category = categories.find(
    //     (category) => category.category_name === element.category,
    //   );

    //   const product = new Product();
    //   product.product_name = element.product_name;
    //   product.description = element.description;
    //   product.price = element.price;
    //   product.image_url =
    //     element.image_url.length !== 0
    //       ? element.image_url
    //       : 'https://res.cloudinary.com/dxpxzcj2i/image/upload/v1724243935/gvmpxhbyz3rvdsvnhvhm.webp';
    //   product.category = category;

    //   await this.productsRepository
    //     .createQueryBuilder()
    //     .insert()
    //     .into(Product)
    //     .values(product)
    //     .orUpdate(['description', 'price'], ['name'])
    //     .execute();
    // });
    // return 'Products added';
    return 'this.products';
  }
  findAll() {
    throw new Error('Method not implemented.');
  }
  findOne(id: number) {
    throw new Error('Method not implemented.');
  }
  update(id: number, updateProductDto: any) {
    throw new Error('Method not implemented.');
  }
  remove(id: number) {
    throw new Error('Method not implemented.');
  }
}
