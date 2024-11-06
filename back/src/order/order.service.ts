import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  create(createOrderDto: CreateOrderDto) {
    console.log('creating order in service', createOrderDto);
    console.log(createOrderDto.user_id);

    const { user_id, order_type, payment_method, note } = createOrderDto;
    return this.orderRepository.createOrder(
      user_id,
      {
        order_type,
        payment_method,
      },
      note,
    );
  }

  findAll() {
    return this.orderRepository.findAll();
  }

  findPending() {
    return this.orderRepository.findPending();
  }
  findCancelled() {
    return this.orderRepository.findCancelled();
  }

  findOne(id) {
    return this.orderRepository.findOne(id);
  }

  update(id: number) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
