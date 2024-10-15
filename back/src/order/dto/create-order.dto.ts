import { IsArray, IsString } from 'class-validator';
import { productDetailDto } from 'src/products/dto/create-product.dto';
import { ProductDetail } from 'src/products/entities/productDetail.entity';

export class CreateOrderDto {
  @IsString()
  userId: string;

  @IsString()
  order_type: OrderType;

  payment_method: PaymentMethod;

  @IsArray()
  // products: { product_id: string; quantity: number; note: string }[];
  products: productDetailDto[];
}

export enum OrderType {
  TakeAway = 'take_away',
  Delivery = 'delivery',
}

export enum PaymentMethod {
  Cash = 'cash',
  Card = 'card',
  // agregar mp
}
