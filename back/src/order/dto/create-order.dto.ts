import { IsArray, IsEmpty, IsString } from 'class-validator';
import { productDetailDto } from 'src/products/dto/create-product.dto';
import { ProductDetail } from 'src/products/entities/productDetail.entity';
import { Column } from 'typeorm';

export class CreateOrderDto {
  @IsString()
  user_id: string;

  @IsString()
  order_type: OrderType;

  payment_method: PaymentMethod;

  @IsEmpty()
  state: string;

  @IsString()
  note: string;
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
