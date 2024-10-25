import { OrderDetail } from 'src/order/entities/orderDetail.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { Cart } from './cart.entity';

@Entity()
export class ProductDetail {
  @PrimaryGeneratedColumn('uuid')
  product_detail_id: string;

  @ManyToOne(
    () => Product,{onDelete: "SET NULL"},
    //   (product) => product.product_detail
  )
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  quantity: number;

  @Column({ type: 'decimal', nullable: false })
  subtotal: number;

  @ManyToOne(() => OrderDetail, (orderDetail) => orderDetail.productDetails)
  @JoinColumn({ name: 'order_detail_id' })
  orderDetail: OrderDetail;

  @ManyToMany(() => Cart, (cart) => cart.productDetail)
  carts: Cart[];
}
