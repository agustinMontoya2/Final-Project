import { Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { ReservationService } from './reservation/reservation.service';
import { OrderService } from './order/order.service';
import { ProductsService } from './products/products.service';
import { Product } from './products/entities/product.entity';
import { User } from './users/entities/user.entity';
import { Order } from './order/entities/order.entity';
import { SaleData } from './SaleData.entity';

@Injectable()
export class AppService {
  constructor(
    private readonly usersService: UsersService,
    private readonly reservationService: ReservationService,
    private readonly orderService: OrderService,
    private readonly productsService: ProductsService,
  ) {}
  async getStats() {
    const SaleData: Partial<SaleData> = {};
    const users = await this.usersService.findAll();
    const reservations =
      await this.reservationService.findAllReservationsService();
    const orders = await this.orderService.findAll();
    const ordersPending = await this.orderService.findPending();
    const ordersCancelled = await this.orderService.findCancelled();

    SaleData.Reserved_tables = reservations;
    SaleData.Orders_made = orders;
    SaleData.Orders_pending = ordersPending;
    SaleData.Orders_cancelled = ordersCancelled;
    SaleData.Users_total = users;

    return SaleData;
  }
}
