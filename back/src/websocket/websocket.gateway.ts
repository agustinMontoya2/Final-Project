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

@WebSocketGateway()
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private readonly websocketService: WebsocketService) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('send-reviews')
  async handleReview(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ) {
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
}
