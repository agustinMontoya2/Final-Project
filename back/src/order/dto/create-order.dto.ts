export class CreateOrderDto {
  userId: string;
  order_type: string;
  payment_method: string;
  productId: string;
  quantity: number;
  note: string;
}
