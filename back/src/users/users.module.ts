import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Cart } from 'src/products/entities/cart.entity';
import { Favorities } from 'src/products/entities/favorities.entity';
import { Product } from 'src/products/entities/product.entity';
import { ProductDetail } from 'src/products/entities/productDetail.entity';
import { ProductsRepository } from 'src/products/products.repository';
import { ProductsModule } from 'src/products/products.module';
import { MailService } from 'src/mail/mail.service';
import { Credential } from 'src/auth/entities/credential.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Cart,
      Favorities,
      Product,
      ProductDetail,
      Credential,
    ]),
    ProductsModule, // Importa ProductsModule, que ya tiene CategoriesModule y ProductsRepository
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, MailService],
  exports: [UsersRepository, UsersService],
})
export class UsersModule {}
