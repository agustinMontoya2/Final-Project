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

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Cart, Favorities, Product, ProductDetail]),
    ProductsModule, // Importa ProductsModule, que ya tiene CategoriesModule y ProductsRepository
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersRepository],
})
export class UsersModule {}
