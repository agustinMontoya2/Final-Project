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
  ) {}

  async createOrder(user_id, details, products) {
    const user = await this.userRepository.findOne({ where: { user_id } });
    if (!user) throw new NotFoundException('User not found');

    const productsFounded: Product[] = [];
    let totalPrice = 0;
    const orderDetail: OrderDetail = new OrderDetail();
    orderDetail.order_type = details.order_type;
    orderDetail.payment_method = details.payment_method;

    for (const product of products) {
      // Validate products
      if (!isUUID(product.product_id))
        throw new BadRequestException(
          `Product id ${product.product_id} is not valid`,
        );
      const productFound = await this.productRepository.findOne({
        where: { product_id: product.product_id },
      });
      if (!productFound || productFound.available === false)
        throw new NotFoundException('Product not found or not available');

      // Create product detail
      const productDetail: ProductDetail = new ProductDetail();
      productDetail.note = product.note;
      productDetail.quantity = product.quantity;
      productDetail.subtotal = productFound.price * product.quantity;
      productDetail.product = productFound;
      productDetail.orderDetail = orderDetail;

      // calculate total and push products
      totalPrice += productDetail.subtotal;

      productsFounded.push(productFound);

      await this.productDetailRepository.insert(productDetail);
    }

    // adding total price
    orderDetail.total = totalPrice;

    // Create order
    const order: Order = new Order();
    order.date = new Date();
    order.user = user;

    orderDetail.order = order;

    await this.orderRepository.save(order);
    console.log(orderDetail);

    await this.orderDetailRepository.save(orderDetail);

    const createdOrder = await this.orderRepository.findOne({
      where: { order_id: order.order_id },
      relations: {
        orderDetail: {
          productDetails: true,
        },
      },
    });
    console.log(createdOrder);

    return 'this.orderRepository.save(order)';

    // const order = await this.orderRepository.save(createOrderDto);
  }
}
