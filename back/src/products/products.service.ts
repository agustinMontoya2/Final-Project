import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository';
import { CategoriesRepository } from 'src/categories/categories.repository';
import { CreateReviewDto } from './dto/create-review.dto';
import { IsUUID } from 'class-validator';
import { WebsocketService } from 'src/websocket/websocket.service';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';

@Injectable()
export class ProductsService implements OnApplicationBootstrap {
  constructor(
    private readonly productRepository: ProductsRepository,
    private readonly categoriesRepository: CategoriesRepository,
    @Inject(forwardRef(() => WebsocketGateway))
    private readonly websocketGateway: WebsocketGateway,
  ) {}

  async onApplicationBootstrap() {
    await this.categoriesRepository.preloadCategories();
    await this.productRepository.addProducts();
  }
  add() {
    return this.productRepository.addProducts();
  }
  async create(createProductDto: CreateProductDto) {
    const {
      product_name,
      description,
      price,
      category_id,
      image_url,
      available,
    } = createProductDto;
    const createdProduct = await this.productRepository.create(
      product_name,
      description,
      price,
      category_id,
      image_url,
      available,
    );
    this.websocketGateway.emitAllProducts();
    return createdProduct;
  }

  findAll(page, limit) {
    return this.productRepository.getProducts(page, limit);
  }

  findOne(id: string) {
    return this.productRepository.findOne(id);
  }

  async update(product_id, updateProductDto: UpdateProductDto) {
    if (!updateProductDto) throw new BadRequestException('Product not valid');
    if (!IsUUID(product_id))
      throw new BadRequestException('Product ID not valid');
    const product = await this.productRepository.findOne(product_id);
    const { product_name, description, price, category_id, available } =
      updateProductDto;
    console.log(updateProductDto);

    const productUpdated = this.productRepository.update(product, {
      product_name,
      description,
      price,
      category_id,
      available,
    });
    this.websocketGateway.emitAllProducts();
    return productUpdated;
  }

  async remove(product_id) {
    if (!IsUUID(product_id))
      throw new BadRequestException('Product ID not valid');
    const product = await this.productRepository.findOne(product_id);
    if (!product) throw new NotFoundException('Product not found');
    const deletedProduct = await this.productRepository.remove(product);
    this.websocketGateway.emitAllProducts();
    return deletedProduct;
  }

  async addReview(product_id, createReviewDto: CreateReviewDto) {
    const { user_id, review, rate } = createReviewDto;
    return this.productRepository.addReview(product_id, user_id, review, rate);
  }

  async getReviews() {
    return this.productRepository.getReviews();
  }

  async getReview(review_id) {
    const review = await this.productRepository.getReview(review_id);
    return review;
  }

  async deleteReviews(review_id) {
    if (!IsUUID(review_id))
      throw new BadRequestException('Review ID not valid');
    const review = await this.getReview(review_id);
    return this.productRepository.deleteReview(review);
  }

  async updateReview(review_id, updateReviewDto) {
    if (!IsUUID(review_id))
      throw new BadRequestException('Review ID not valid');
    const review = await this.getReview(review_id);
    return this.productRepository.updateReview(review, updateReviewDto);
  }
}
