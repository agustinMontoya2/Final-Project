import { forwardRef, Module } from '@nestjs/common';
import { WebsocketService } from './websocket.service';
import { WebsocketGateway } from './websocket.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from 'src/products/entities/review.entity';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { ProductsService } from 'src/products/products.service';
import { ProductsRepository } from 'src/products/products.repository';
import { ProductsModule } from 'src/products/products.module';

@Module({
  providers: [WebsocketGateway, WebsocketService],
  imports: [
    TypeOrmModule.forFeature([Review, Product, User]),
    forwardRef(() => ProductsModule),
  ],
  exports: [WebsocketGateway, WebsocketService],
})
export class WebsocketModule {}
