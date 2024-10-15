import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderRepository } from './order.repository';
import { isUUID } from 'class-validator';
import { ProductsRepository } from 'src/products/products.repository';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}
  create(createOrderDto: CreateOrderDto) {
    const { userId, order_type, payment_method, products } = createOrderDto;

    return this.orderRepository.createOrder(
      userId,
      { order_type, payment_method },
      products,
    );
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
