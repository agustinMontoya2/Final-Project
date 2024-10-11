import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'Name of the product',
    example: 'Cheese burguer',
  })
  name: string;

  @ApiProperty({
    description: 'Description of the product',
    example: 'The biggest cheeseburguer in the world',
  })
  description: string;

  @ApiProperty({
    description: 'Price of the product',
    example: 199.99,
  })
  price: number;

  @ApiProperty({
    description: 'Image URL of the product',
    example:
      'https://res.cloudinary.com/dxpxzcj2i/image/upload/v1724243935/gvmpxhbyz3rvdsvnhvhm.webp',
  })
  imgUrl: string;

  @ApiProperty({
    description: 'Availability of the product',
    example: true,
  })
  available: boolean;
}
