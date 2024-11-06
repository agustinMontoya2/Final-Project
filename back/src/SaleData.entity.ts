import { Order } from './order/entities/order.entity';
import { Reservation } from './reservation/entities/reservation.entity';

export interface SaleData {
  Reserved_tables: Reservation[];
  Orders_made: Order[];
  Orders_pending: Order[];
  Orders_cancelled: Order[];
  Users_total;
}
