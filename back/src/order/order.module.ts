import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { TypeORMError } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';
import { OrderDetail } from './entities/orderDetail.entity';
import { ProductDetail } from 'src/products/entities/productDetail.entity';
import { UsersModule } from 'src/users/users.module';
import { ProductsModule } from 'src/products/products.module';
import { MailService } from 'src/mail/mail.service';
import { Credential } from 'src/auth/entities/credential.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      OrderDetail,
      User,
      Product,
      ProductDetail,
      Credential,
    ]),
    UsersModule,
    ProductsModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, MailService, OrderRepository],
  exports: [OrderRepository, OrderService],
})
export class OrderModule {}
