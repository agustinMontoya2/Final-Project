import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
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
  name: string;

  @ApiProperty({
    description: 'Description of the product',
    example: 'The biggest cheeseburguer in the world',
  })
  @IsNotEmpty({ message: 'product description is required' })
  @IsString({ message: 'product description must be a string' })
  @Length(3, 50, {
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
  imgUrl: string;

  @ApiProperty({
    description: 'Availability of the product',
    example: true,
  })
  @IsNotEmpty({message: 'Availability is required'})
  @IsBoolean()
  available: boolean;
}
