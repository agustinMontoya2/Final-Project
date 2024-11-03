import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayDisconnect,
  OnGatewayConnection,
  ConnectedSocket,
} from '@nestjs/websockets';
import { WebsocketService } from './websocket.service';
import { CreateWebsocketDto } from './dto/create-websocket.dto';
import { UpdateWebsocketDto } from './dto/update-websocket.dto';
import { Server, Socket } from 'socket.io';
import { Product } from 'src/products/entities/product.entity';
import { ProductsService } from 'src/products/products.service';

@WebSocketGateway({
  cors: {
    origin: [
      'https://final-project-blush-gamma.vercel.app',
      'http://localhost:4000',
    ],
    methods: ['GET', 'POST'],
    credentials: true, // Si necesitas manejar credenciales
  },
})
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private readonly websocketService: WebsocketService) {}

  handleConnection(client: Socket) {
    this.emitAllProducts();
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('send-reviews')
  async handleReview(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(data);

    const { user_id, product_id, review, rate } = data;
    const Review = {
      user_id: data.user_id,
      product_id: data.product_id,
      review: data.review,
      rate: data.rate,
    };
    const reviewCreated = await this.websocketService.addReview(
      Review,
      user_id,
      product_id,
    );
    this.server.emit('get-reviews', reviewCreated);
  }

  @SubscribeMessage('send')
  onlySend(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    console.log(data);
    client.broadcast.emit('get', data);
  }

  async emitAllProducts() {
    const response = await this.websocketService.emitAllProducts();
    this.server.emit('products', response);
  }

  @SubscribeMessage('getProductById')
  async handleGetProduct(
    @MessageBody() productId: string,
    @ConnectedSocket() client: Socket,
  ) {}
}
