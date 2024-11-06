import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateReviewDto, UpdateReviewDto } from './dto/create-review.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('products')
@ApiTags('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // Product endpoints

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get('add')
  add() {
    return this.productsService.add();
  }

  @Get('reviews')
  getReviews() {
    return this.productsService.getReviews();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.findOne(id);
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Put('review/:id')
  updateReview(
    @Param('id', ParseUUIDPipe) review_id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return this.productsService.updateReview(review_id, updateReviewDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) product_id: string) {
    return this.productsService.remove(product_id);
  }

  // Review endpoints

  @Get('review/:id')
  getReview(@Param('id', ParseUUIDPipe) review_id: string) {
    return this.productsService.getReview(review_id);
  }

  @Post('review/:id')
  addReview(
    @Param('id', ParseUUIDPipe) product_id: string,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    return this.productsService.addReview(product_id, createReviewDto);
  }

  @Delete('review/:id')
  deleteReviews(@Param('id', ParseUUIDPipe) review_id: string) {
    return this.productsService.deleteReviews(review_id);
  }

  // Utility endpoint (for testing purposes)
}
