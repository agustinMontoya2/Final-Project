import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { PaymentRepository } from './payment.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Cart } from 'src/products/entities/cart.entity';
import { User } from 'src/users/entities/user.entity';
import { Order } from 'src/order/entities/order.entity';
import { OrderRepository } from 'src/order/order.repository';
import { OrderModule } from 'src/order/order.module';
import { ProductDetail } from 'src/products/entities/productDetail.entity';
import { OrderDetail } from 'src/order/entities/orderDetail.entity';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      Cart,
      User,
      Order,
      ProductDetail,
      OrderDetail,
    ]),
    OrderModule,
  ],
  controllers: [PaymentController],
  providers: [PaymentService, PaymentRepository, MailService],
})
export class PaymentModule {}
