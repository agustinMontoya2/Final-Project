import { forwardRef, Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Category } from 'src/categories/entities/category.entity';
import { CategoriesRepository } from 'src/categories/categories.repository';
import { CategoriesModule } from 'src/categories/categories.module';
import { User } from 'src/users/entities/user.entity';
import { Review } from './entities/review.entity';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';
import { WebsocketService } from 'src/websocket/websocket.service';
import { WebsocketModule } from 'src/websocket/websocket.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category, User, Review]),
    CategoriesModule,
    forwardRef(() => WebsocketModule),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository, WebsocketService],
  exports: [ProductsRepository, ProductsService],
})
export class ProductsModule {}
