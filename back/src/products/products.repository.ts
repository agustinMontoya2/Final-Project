import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import * as data from '../utils/Archivo.json';
import { Category } from 'src/categories/entities/category.entity';
import { BadRequestException } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Review } from './entities/review.entity';

export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  getProducts() {
    return this.productsRepository.find({ relations: ['category'] });
  }
  async addProducts() {
    const categories = await this.categoriesRepository.find();
    console.log(categories);

    data?.map(async (element) => {
      const category = categories.find(
        (category) => category.category_name === element.category,
      );
      console.log('************************');
      console.log(categories); //only burguers and fries
      console.log('************************');
      //   console.log(element);
      //   console.log('************************');

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
        .orUpdate(['description', 'price', 'category_id'], ['product_name'])
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
    if (!isUUID(product_id))
      throw new BadRequestException('Product ID not valid');
    const product = await this.productsRepository.findOne({
      where: { product_id },
      relations: ['reviews'],
    });
    if (!product) throw new BadRequestException('Product not found');
    return product;
  }
  async update(product_id: string, updateProductDto: any) {
    await this.productsRepository.update(product_id, updateProductDto);
    const product = await this.findOne(product_id);
    return product;
  }
  remove(id: number) {
    throw new Error('Method not implemented.');
  }

  async addReview(product, user_id, review, rate) {
    if (!isUUID(user_id)) throw new BadRequestException('User ID not valid');

    const user = await this.userRepository.findOne({ where: { user_id } });
    if (!user) throw new BadRequestException('User not found');

    const newReview = new Review();
    newReview.product = product;
    newReview.user = user;
    newReview.review = review;
    newReview.rate = rate;
    await this.reviewRepository.save(newReview);
    await this.productsRepository.save(product);
    return `${user.name} say ${review}, ${rate} points. About ${product.product_name}`;
  }
}
