export class CreateOrderDto {
  userId: string;
  order_type: string;
  payment_method: string;
  //array []
  productId: string;
  quantity: number;
  note: string;
}
