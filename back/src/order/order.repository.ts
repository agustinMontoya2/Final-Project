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
import { Console } from 'console';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class OrderRepository {
  private purchaseOrder: any;
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private orderDetailRepository: Repository<OrderDetail>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(ProductDetail)
    private productDetailRepository: Repository<ProductDetail>,
    private readonly usersRepository: UsersRepository,
    private readonly mailService: MailService,
  ) {}

  async createOrder(user_id, details, note) {
    console.log('searching user id', user_id);
    const user = await this.userRepository.findOne({
      where: { user_id },
      relations: ['cart', 'cart.productDetail'],
    });
    if (!user || !user.cart) throw new NotFoundException('Cart not found');
    console.log(user);

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
    if (details.payment_method === 'card') {
      order.state = 'approved';
    }
    await this.orderRepository.save(order);
    await this.orderDetailRepository.save(orderDetail);

    await this.usersRepository.removeAllCart(user);
    const userFind = await this.usersRepository.getEmailByUser(user_id);
    await this.mailService.mailConfirm(userFind, 'Order');
    return { message: 'order created successfully', orderId: order.order_id };
    return cart;
  }

  async orderPayment() {
    const uuidOrder = this.purchaseOrder;
    console.log(
      'ORDER REPOSITORY EN FUNCION ORDERPAYMEN VALOR UUID',
      uuidOrder,
    );
    return uuidOrder;
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

  async findAll() {
    const order = await this.orderRepository.find({
      relations: ['orderDetail', 'orderDetail.productDetails'],
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }
  async findPending() {
    const order = await this.orderRepository.find({
      where: { state: 'pending' },
      relations: ['orderDetail', 'orderDetail.productDetails'],
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }
  async findCancelled() {
    const order = await this.orderRepository.find({
      where: { state: 'cancelled' },
      relations: ['orderDetail', 'orderDetail.productDetails'],
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }
}
