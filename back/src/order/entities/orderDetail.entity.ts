import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { Product } from 'src/products/entities/product.entity';

@Entity()
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  orderDetail_id: string;

  //productDetail

  @Column()
  orderType: string;

  @Column()
  paymentMethod: string;

  @Column()
  total: number;

  @OneToOne(() => Order, (order) => order.orderDetail)
  order: Order;
}

/**
 * orderDetail
 * 
id "6664545"
productsDetail: [
  {
  productId: "dsfs",
	aclaracion: "gdfdfg",
	cantidad: 3
  },
  {
  productId: "hhjhj",
	aclaracion: "jjhjhj",
	cantidad: 3
  }
]

order_type: "delivery"
payment_method: "card"
total: 400
order_id: "324234"

 */
