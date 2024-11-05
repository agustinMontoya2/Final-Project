import { User } from 'mercadopago';
import { Order } from './order/entities/order.entity';
import { Product } from './products/entities/product.entity';
import { Credential } from './auth/entities/credential.entity';
import { Reservation } from './reservation/entities/reservation.entity';

export interface SaleData {
  Reserved_tables: Reservation[];
  Orders_made: Order[];
  Orders_pending: Order[];
  Orders_cancelled: Order[];
  Users_total;
}
