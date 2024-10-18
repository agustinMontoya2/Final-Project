import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Order } from './order.entity';
import { ProductDetail } from 'src/products/entities/productDetail.entity';

@Entity()
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  order_detail_id: string;

  //productDetail

  @Column()
  order_type: string;

  @Column()
  payment_method: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  total: number;

  @OneToOne(() => Order, (order) => order.orderDetail)
  order: Order;

  @OneToMany(
    () => ProductDetail,
    (productDetail) => productDetail.orderDetail,
    // { cascade: true },
  )
  productDetails: ProductDetail[];

  @Column()
  note: string;
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
