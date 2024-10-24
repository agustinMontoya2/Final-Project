import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateProductDto {
  @IsString({ message: 'product name must be a string' })
  @IsNotEmpty({ message: 'product name is required' })
  @ApiProperty({
    description: 'Name of the product',
    example: 'Cheese burguer',
  })
  @Length(3, 50, {
    message: 'Product name must be between 3 and 50 characters',
  })
  product_name: string;

  @ApiProperty({
    description: 'Description of the product',
    example: 'The biggest cheeseburguer in the world',
  })
  @IsNotEmpty({ message: 'product description is required' })
  @IsString({ message: 'product description must be a string' })
  @Length(3, 200, {
    message: 'Product description must be between 3 and 50 characters',
  })
  description: string;

  @ApiProperty({
    description: 'Price of the product',
    example: 199.99,
  })
  @IsNumber({}, { message: 'product price must be a number' })
  @IsNotEmpty({ message: 'product price is required' })
  price: number;

  @ApiProperty({
    description: 'Image URL of the product',
    example:
      'https://res.cloudinary.com/dxpxzcj2i/image/upload/v1724243935/gvmpxhbyz3rvdsvnhvhm.webp',
  })
  @IsString({
    message: 'product image url must be a string',
  })
  @IsOptional()
  image_url: string;

  @ApiProperty({
    description: 'Availability of the product',
    example: true,
  })
  @IsNotEmpty({ message: 'Availability is required' })
  @IsBoolean()
  available: boolean;

  @IsString()
  category_id: string;
}

export class productDetailDto {
  @ApiProperty({
    description: 'Product id',
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  @IsNotEmpty({ message: 'product id is required' })
  @IsString({ message: 'product id must be a string' })
  @Length(3, 50, {
    message: 'Product id must be between 3 and 50 characters',
  })
  product_id: string;

  @ApiProperty({
    description: 'Quantity of the product',
    example: 1,
  })
  @IsNumber({}, { message: 'product quantity must be a number' })
  quantity: number = 1;
}
