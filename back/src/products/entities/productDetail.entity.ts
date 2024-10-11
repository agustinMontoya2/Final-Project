import { OrderDetail } from 'src/order/entities/orderDetail.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class ProductDetail {
  @PrimaryGeneratedColumn('uuid')
  product_detail_id: string;

  @ManyToOne(
    () => Product,
    //   (product) => product.product_detail
  )
  @JoinColumn({ name: 'product_id' })
  product: string;

  @Column()
  note: string;

  @Column()
  quantity: number;

  @Column()
  subtotal: number;

  @ManyToOne(() => OrderDetail, (orderDetail) => orderDetail.productDetails)
  @JoinColumn({ name: 'order_detail_id' })
  orderDetail: OrderDetail;
}
