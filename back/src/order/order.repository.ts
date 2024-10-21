import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { isUUID } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';
import { OrderDetail } from './entities/orderDetail.entity';
import { ProductDetail } from 'src/products/entities/productDetail.entity';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private orderDetailRepository: Repository<OrderDetail>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(ProductDetail)
    private productDetailRepository: Repository<ProductDetail>,
    private readonly usersRepository: UsersRepository,
  ) {}

  async createOrder(user_id, details, note) {
    const user = await this.userRepository.findOne({
      where: { user_id },
      relations: ['cart', 'cart.productDetail'],
    });
    if (!user || !user.cart) throw new NotFoundException('Cart not found');
    console.log(details);

    console.log(note);
    const cart = user.cart;
    let total = 0;
    console.log(cart.productDetail);

    cart.productDetail.forEach((productDetail) => {
      total += Number(productDetail.subtotal);
    });
    const orderDetail = new OrderDetail();
    orderDetail.order_type = details.order_type;
    orderDetail.payment_method = details.payment_method;
    orderDetail.note = note;
    orderDetail.total = total;
    orderDetail.productDetails = cart.productDetail;

    const order = new Order();
    order.user = user;
    order.date = new Date();

    orderDetail.order = order;
    await this.orderRepository.save(order);
    await this.orderDetailRepository.save(orderDetail);

    const orderFinal = await this.orderRepository.findOne({
      where: { order_id: order.order_id },
    });
    const orderDetailFinal = await this.orderDetailRepository.findOne({
      where: { order_detail_id: orderDetail.order_detail_id },
      relations: ['productDetails', 'productDetails.product'],
    });

    await this.usersRepository.removeAllCart(user);

    return { message: 'order created successfully' };
    return cart;

    // const orderDetail: OrderDetail = new OrderDetail();
    // orderDetail.order_type = details.order_type;
    // orderDetail.payment_method = details.payment_method;

    // orderDetail.total = totalPrice;

    // const order: Order = new Order();
    // order.date = new Date();
    // order.user = user;

    // orderDetail.order = order;

    // await this.orderRepository.save(order);

    // return 'this.orderRepository.save(order)';

    // // const order = await this.orderRepository.save(createOrderDto);
  }

  async findOne(user_id) {
    if (!isUUID(user_id)) throw new BadRequestException('Invalid ID');
    const user = await this.userRepository.findOne({
      where: { user_id },
    });
    if (!user) throw new NotFoundException('User not found');
    const order = await this.orderRepository.find({
      where: { user },
      relations: ['orderDetail', 'orderDetail.productDetails'],
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }
}
