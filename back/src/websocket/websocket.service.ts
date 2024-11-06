import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateWebsocketDto } from './dto/create-websocket.dto';
import { UpdateWebsocketDto } from './dto/update-websocket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/products/entities/review.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { ProductsService } from 'src/products/products.service';
import { WebSocketServer } from '@nestjs/websockets';
import { Server } from 'http';

@Injectable()
export class WebsocketService {
  @WebSocketServer()
  server: Server;

  constructor(
    @Inject(forwardRef(() => ProductsService))
    private readonly productsService: ProductsService,
  ) {}

  connection(client) {
    console.log(`Client connected: ${client.id}`);
    this.emitAllProducts();
  }
  create(createWebsocketDto: CreateWebsocketDto) {
    return 'This action adds a new websocket';
  }

  findAll() {
    return `This action returns all websocket`;
  }

  findOne(id: number) {
    return `This action returns a #${id} websocket`;
  }

  update(id: number, updateWebsocketDto: UpdateWebsocketDto) {
    return `This action updates a #${id} websocket`;
  }

  remove(id: number) {
    return `This action removes a #${id} websocket`;
  }

  async addReview(review, user_id, product_id) {
    // const user = await this.userRepository.findOne({ where: { user_id } });
    // const product = await this.productRepository.findOne({
    //   where: {
    //     product_id,
    //   },
    // });
    // if (!user) throw new NotFoundException('User not found');
    // if (!product) throw new NotFoundException('Product not found');

    // review.user = user;
    // review.product = product;
    return 'await this.reviewRepository.save(review);';
  }

  async emitAllProducts() {
    console.log('wmitiendo');

    const products: Product[] = await this.productsService.findAll(); // Llama al servicio para obtener los productos
    return products;
  }

  // async emitOneProduct(product_id) {
  //   const product: Product = await this.productsService.findOne(product_id);
  //   if (product) {
  //     client.emit('singleProduct', product); // Envía el producto al cliente que hizo la solicitud
  //   } else {
  //     client.emit('error', { message: 'Product not found' }); // Envía un mensaje de error si el producto no existe
  //   }
  // }
}
