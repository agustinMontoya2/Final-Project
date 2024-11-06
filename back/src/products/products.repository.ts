import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import * as data from '../utils/Archivo.json';
import { Category } from 'src/categories/entities/category.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
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

  async getProducts() {
    const product = await this.productsRepository.find({
      relations: ['category', 'reviews'],
      // where: { available: true },
    });
    if (!product) throw new NotFoundException('Products not found');
    return product;
  }
  async getAllProducts() {
    const product = await this.productsRepository.find({
      relations: ['category', 'reviews'],
    });
    if (!product) throw new NotFoundException('Products not found');
    return product;
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
          : 'https://res.cloudinary.com/dpnhtxzv3/image/upload/v1730847626/yu0eqanztugvb5mmgzah.png';
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

  async create(
    product_name,
    description,
    price,
    category_id,
    image_url,
    available,
  ) {
    const product = await this.productsRepository.findOne({
      where: { product_name: product_name },
    });
    if (product) throw new BadRequestException('Product already exists');
    if (!isUUID(category_id))
      throw new BadRequestException('Category ID not valid');
    const category = await this.categoriesRepository.findOne({
      where: { category_id },
    });
    // const categories = await this.categoriesRepository.find();
    // throw new NotFoundException(categories);
    if (!category)
      throw new NotFoundException(`Categort with id ${category_id} not found`);
    const createProduct = new Product();
    createProduct.product_name = product_name;
    createProduct.description = description;
    createProduct.price = price;
    createProduct.category = category;
    createProduct.image_url = image_url;
    createProduct.available = available;
    return this.productsRepository.save(createProduct);
  }

  async findOne(product_id: string) {
    if (!isUUID(product_id))
      throw new BadRequestException('Product ID not valid');
    const product = await this.productsRepository.findOne({
      where: { product_id },
      relations: ['reviews.user', 'reviews'],
    });
    if (!product) throw new BadRequestException('Product not found');
    return product;
  }
  async update(product, updateProductDto) {
    const { product_name, description, price, category_id, available } =
      updateProductDto;

    if (!isUUID(category_id))
      throw new BadRequestException('Category ID not valid');

    const category = await this.categoriesRepository.findOne({
      where: { category_id },
    });
    if (!category) throw new BadRequestException('Category not found');

    // const repeatedProduct = await this.productsRepository.findOne({
    //   where: { product_name },
    // });
    // if (repeatedProduct && repeatedProduct.product_id !== product.product_id)
    //   throw new BadRequestException('Product already exists');

    console.log(category);
    console.log({ product_name, description, price, category, available });

    await this.productsRepository.update(product.product_id, {
      product_name,
      description,
      price,
      category,
      available,
    });
    return product;
  }

  async addReview(product_id, user_id, review, rate) {
    if (!isUUID(user_id)) throw new BadRequestException('User ID not valid');

    const user = await this.userRepository.findOne({ where: { user_id } });
    if (!user) throw new BadRequestException('User not found');
    const product = await this.productsRepository.findOne({
      where: { product_id },
    });
    if (!product) throw new BadRequestException('Product not found');
    const oldReview = await this.reviewRepository.findOne({
      where: { user, product },
    });
    if (oldReview) throw new BadRequestException('Review already exists');

    const newReview = new Review();
    newReview.product = product;
    newReview.user = user;
    newReview.review = review;
    newReview.rate = rate;
    await this.reviewRepository.save(newReview);
    await this.productsRepository.save(product);
    const reviewCreated = await this.reviewRepository.findOne({
      where: { review_id: newReview.review_id },
    });
    return reviewCreated;
  }

  async getReviews() {
    const review = await this.reviewRepository.find({
      relations: ['user', 'product'],
    });
    if (!review) throw new NotFoundException('Reviews not found');
    return review;
  }

  async getReview(review_id) {
    if (!isUUID(review_id))
      throw new BadRequestException('Review ID not valid');
    const review = await this.reviewRepository.findOne({
      where: { review_id },
    });
    if (!review) throw new NotFoundException('Review not found');
    return review;
  }

  async deleteReview(review) {
    await this.reviewRepository.delete(review);
    return { message: 'Review deleted' };
  }

  async updateReview(oldReview, updateReviewDto) {
    const { review, rate } = updateReviewDto;
    if (!review && !rate)
      throw new BadRequestException('Review or rate not valid');
    if (rate) oldReview.rate = rate;
    if (review) oldReview.review = review;
    await this.reviewRepository.save(oldReview);
    return oldReview;
  }

  async remove(product) {
    console.log(product);
    await this.productsRepository.remove(product);
    return { message: 'Product deleted' };
  }
}
