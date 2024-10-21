import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersRepository } from 'src/users/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Credential } from './entities/credential.entity';
import { Cart } from 'src/products/entities/cart.entity';
import { Favorities } from 'src/products/entities/favorities.entity';
import { ProductsModule } from 'src/products/products.module';
import { UsersModule } from 'src/users/users.module';
import { ProductsRepository } from 'src/products/products.repository';
import { Product } from 'src/products/entities/product.entity';
import { ProductDetail } from 'src/products/entities/productDetail.entity';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Credential,
      Product,
      ProductDetail,
      Cart,
      Favorities,
    ]),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersRepository, MailService],
})
export class AuthModule {}
